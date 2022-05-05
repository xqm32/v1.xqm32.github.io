var utf8 = aesjs.utils.utf8;
var hex = aesjs.utils.hex
var AesCfb = aesjs.ModeOfOperation.cfb
var wrdvpnKey = ''
var wrdvpnIV = ''
var textRightAppend = function (text, mode) {
    var segmentByteSize = mode === 'utf8' ? 16 : 32

    if (text.length % segmentByteSize === 0) {
        return text
    }

    var appendLength = segmentByteSize - text.length % segmentByteSize
    var i = 0
    while (i++ < appendLength) {
        text += '0'
    }
    return text
}

var encrypt = function (text, key, iv) {
    var textLength = text.length
    text = textRightAppend(text, 'utf8')
    var keyBytes = utf8.toBytes(key)
    var ivBytes = utf8.toBytes(iv)
    var textBytes = utf8.toBytes(text)
    var aesCfb = new AesCfb(keyBytes, ivBytes, 16)
    var encryptBytes = aesCfb.encrypt(textBytes)
    return hex.fromBytes(ivBytes) + hex.fromBytes(encryptBytes).slice(0, textLength * 2)
}

var decrypt = function (text, key) {
    var textLength = (text.length - 32) / 2
    text = textRightAppend(text, 'hex')
    var keyBytes = utf8.toBytes(key)
    var ivBytes = hex.toBytes(text.slice(0, 32))
    var textBytes = hex.toBytes(text.slice(32))
    var aesCfb = new AesCfb(keyBytes, ivBytes, 16)
    var decryptBytes = aesCfb.decrypt(textBytes)
    return utf8.fromBytes(decryptBytes).slice(0, textLength)
}
var encrypUrl = function (protocol, url) {
    var port = "";
    var segments = "";

    if (url.substring(0, 7) == "http://") {
        url = url.substr(7);
    } else if (url.substring(0, 8) == "https://") {
        url = url.substr(8);
    }


    var v6 = "";
    var match = /\[[0-9a-fA-F:]+?\]/.exec(url);
    if (match) {
        v6 = match[0];
        url = url.slice(match[0].length);
    }
    segments = url.split("?")[0].split(":");
    if (segments.length > 1) {
        port = segments[1].split("/")[0]
        url = url.substr(0, segments[0].length) + url.substr(segments[0].length + port.length + 1);
    }

    if (protocol != "connection") {
        var i = url.indexOf('/');
        if (i == -1) {
            if (v6 != "") {
                url = v6;
            }
            url = encrypt(url, wrdvpnKey, wrdvpnIV)
        } else {
            var host = url.slice(0, i);
            var path = url.slice(i);
            if (v6 != "") {
                host = v6;
            }
            url = encrypt(host, wrdvpnKey, wrdvpnIV) + path;
        }
    }
    if (port != "") {
        url = "/" + protocol + "-" + port + "/" + url;
    } else {
        url = "/" + protocol + "/" + url;
    }
    return url;
}

var add_record = function (url) {
    var timeStamp = Date.parse(new Date());
    if (url.indexOf("wrdrecordvisit") == -1) {
        if (url.indexOf("?") != -1) {
            url = url + "&wrdrecordvisit=" + timeStamp
        } else {
            url = url + "?wrdrecordvisit=" + timeStamp
        }
    }
    return url;
}

var go = function (url) {
    var protocol = parseProtocol(url);
    if (protocol == "") {
        protocol = $("select[name='protocol']").val();
    } else {
        url = url.replace(protocol + "://", "")
    }

    if (url == "") {
        alert("请输入你所需要访问的地址！")
        return
    }

    var host = parseHost(url);
    if (host == "") {
        protocol = "https"
        url = "www.baidu.com/s?wd=" + $("input[name='goUrl']").val().trim();
        ;
    }
    url = encrypUrl(protocol, url)
    if (['http', 'https', 'ssh', 'telnet', 'rdp', 'vnc'].indexOf(protocol) != -1) {
        url = add_record(url)
    }
    $("#aHref").attr("href", url);
    document.getElementById("aHref").click()
}

var parseProtocol = function (url) {
    if (/^((http|https|ssh|telnet|rdp|vnc):\/\/)/.test(url)) {
        return url.match(/^((http|https|ssh|telnet|rdp|vnc):\/\/)/)[0].replace("://", "")
    }
    return ""
}

var parseHost = function (url) {
    if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])/.test(url)) {
        return url.match(/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))/)[0]
    } else if (/^(\[\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*\])/.test(url)) {
        return url.match(/^(\[\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*\])/)[0]
    } else if (/^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+?/.test(url)) {
        return url.match(/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/)[0]
    }
    return ""
}

var parsePort = function (url) {
    if (/^\//.test(url)) {
        return ""
    } else if (/^(:\d+\/)/.test(url)) {
        return url.match(/^(:\d+\/)/)[0].replace(":", "").replace("/", "")
    }
    return ""
}

var getSelfAccess = function (protocols) {
    var htmlText = ''
    for (var i in protocols) {
        htmlText += '<option value="' + protocols[i] + '">' + (protocols[i] === 'rdp' ? 'RDP远程桌面' : protocols[i]) + '</option>'
        if (protocols[i] == 'http') {
            htmlText += '<option value="https">https</option>'
        }
    }
    htmlText = '<div class="vpn-panel layui-row layui-anim layui-anim-fadein ayui-show-xs-inline-block" id="collapse-panel">\
                    <div class="layui-form">\
                        <div class="layui-form-item" style="margin: 0;">\
                            <div class="layui-inline" style="display: flex;justify-content: center;margin: 0;">\
                                <select name="protocol" style="width: 100px;flex-shrink: 0" lay-filter="protocol">\
                                    ' + htmlText + '\
                                </select>\
                                <input id="quick-access-input" type="text" name="goUrl" placeholder="输入域名或链接直接访问校内资源或图书馆资源" class="layui-input">\
                                <button type="button" id="go" style="max-width: 100px;" class="layui-btn layui-hide-xs layui-btn-normal">立即跳转</button>\
                            </div>\
                            <div class="layui-row" style="text-align: center;">\
                                <button type="button" id="go" style="width: 100%;" class="layui-btn layui-hide-sm layui-btn-normal">立即跳转</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    return htmlText
}

var getPortalGroupHtml = function (data) {
    var groups = data.data
    var bastion = data.bastion
    var htmlText = ''
    for (var i in groups) {
        group = groups[i].group
        resources = groups[i].resource
        if (groups[i].type === 'bastion') {
            if (bastion.length === 0) {
                continue
            }
            htmlText += '<div id="group-' + group.id + '" class="layui-row vpn-content-block">\
                    <div class="layui-col-xs12 vpn-content-block__title">' + group.group_name + '</div>\
                    <div class="layui-hide-xs layui-hide-sm layui-show-md-inline-block layui-col-md3 layui-col-lg2  vpn-bastion-tree">\
                        <ul id="ztree" class="ztree"></ul>\
                    </div>\
                    <div id="vpn-bastion-list" class="layui-col-xs12 layui-col-sm12 layui-col-md9 layui-col-lg10 vpn-bastion-list">\
                    </div>\
                </div>'
        } else {
            var itemsHtml = ''
            for (var j in resources) {
                resource = resources[j]
                itemsHtml += '<div class="layui-col-xs12 layui-col-sm6 layui-col-md4 layui-col-lg3" style="padding: 10px 10px 10px 0px;">\
                        <div class="vpn-content-block-panel"\
                            data-search="' + resource.name + '_' + resource.name + '"\
                            data-type="' + resource.resource_type + '"\
                            data-title="' + resource.name + '"\
                            data-logo="' + resource.logo + '"\
                            data-url="' + resource.url + '"\
                            title="' + resource.name + '"\
                        >\
                            <div class="vpn-content-block-panel__image">\
                                    ' + (resource.logo ? '<div style="background:#fff;">\
                                        <img src="/wengine-vpn/js/image/portal_logos/' + resource.logo + '" alt="" style="width: 100%;height: 100%;background:#fff;">\
                                    </div>' : '<div>\
                                        <span>' + resource.name[0] + '</span>\
                                    </div>') + '\
                            </div>\
                            <div class="vpn-content-block-panel__content">\
                                <p title="' + resource.name + '">' + resource.name + '</p>\
                                <p class="vpn-content-block-panel__url" title="' + resource.detail + '">' + resource.detail + '</p>\
                            </div>\
                            <div\
                                class="vpn-content-block-panel__collect_ed"\
                                data-resource="' + resource.name + '"\
                                data-url="' + resource.url + '"\
                                data-redirect="' + resource.redirect + '"\
                                data-name="' + resource.name + '"\
                                data-type="' + resource.resource_type + '"\
                                data-logo="' + resource.logo + '"\
                                data-detail="' + resource.detail + '"\
                            >\
                                <i class="layui-icon layui-icon-rate"></i>\
                            </div>\
                        </div>\
                    </div>'
            }

            htmlText += '<div id="group-' + group.id + '" class="layui-row vpn-content-block">\
                    <div class="layui-col-xs12 vpn-content-block__title">' + group.group_name + '</div>\
                    ' + itemsHtml + '\
                    </div>'
        }
    }
    return htmlText
}

var getPortalGroupSidebarHtml = function (data) {
    var groups = data.data
    var bastion = data.bastion
    var htmlText = ''
    for (var i in groups) {
        group = groups[i].group
        if (group.type === 'bastion' && bastion.length === 0) {
            continue
        }
        htmlText += '<div class="sidebar-tree__item"><a data-group="group-' + group.id + '">' + group.group_name + '</a></div>'
    }
    htmlText = '<div class="vpn-sidebar layui-hide-xs layui-hide-sm layui-show-md-inline-block layui-col-md2 layui-col-lg2">\
        <div class="sidebar-tree">' + htmlText + '</div></div>'
    return htmlText
}

var getHeader = function (userInfo) {
    var visitAnywhereHtml = userInfo.selfAccess ? '<div id="quick-access-collapse" class="layui-show-sm-inline-block layui-show-xs-inline-block" style="padding-right: 20px;cursor:pointer;">快速跳转</div>' : ''
    var searchHtml = '<div id="search-bar" class="layui-show-sm-inline-block layui-hide-xs">\
                        <input id="search-input" type="text" name="search" class="layui-input layui-anim layui-anim-scale" placeholder="站内搜索" style="min-width: 180px;display: none;"/>\
                        <i id="search-icon" class="layui-icon layui-icon-search" style="font-size: 16px;padding: 6px;cursor:pointer;"></i>\
                    </div>'
    var userHtml = '<div class="layui-show-xs-inline-block layui-show-sm-inline-block" id="profile" style="cursor: pointer;">\
                        <i class="layui-icon layui-icon-user" style="font-size: 16px;padding: 6px;"></i>\
                        <span class="layui-show-sm-inline-block layui-hide-xs">' + userInfo.username + '</span>\
                    </div>'
    var profileMenuHtml = ''
    if (userInfo.userType != 'ip') {
        profileMenuHtml = '<a class="vpn-menu-item" href="/person-manage">个人信息</a>'
        if (userInfo.canVisitConnection) {
            profileMenuHtml += '<a class="vpn-menu-item" href="/connection-manage">连接管理</a>'
        }

        if (userInfo.showFAQ) {
            profileMenuHtml += '<a class="vpn-menu-item" href="/faq">使用帮助</a>'
        }
    }
    profileMenuHtml += '<a class="vpn-menu-item" href="/logout">注销</a>'
    profileMenuHtml = '<div id="vpn-menu" class="vpn-menu layui-anim layui-anim-scale">' + profileMenuHtml + '</div>'
    return visitAnywhereHtml + searchHtml + userHtml + profileMenuHtml
}

var getHistory = function () {
    return '<div id="history"></div>'
}

var getCollect = function () {
    return '<div id="collect"></div>'
}

var loadHeader = function (quickAccess) {
    $.ajax({
        url: '/user/info',
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (res) {
            var info = res
            wrdvpnKey = info.wrdvpnKey
            wrdvpnIV = info.wrdvpnIV
            var html = getHeader(info)
            var selfAccessHtml = getSelfAccess(info.canVisitProtocol)
            $("#header").html(html)
            $("#vpn-content").html(selfAccessHtml)
            $("input[name='search']").on("keyup", function () {
                var key = $(this).val().toLowerCase();
                $(".vpn-content-block-panel, .bastion-item").each(function (i, e) {
                    var subject = $(e).data('search').toLowerCase();
                    if (key == "" || subject.indexOf(key) != -1) {
                        $(e).show();
                    } else {
                        $(e).hide();
                    }
                });
            });

            $("#profile").click(function () {
                $("#vpn-menu").toggle();
            });
            $("#search-icon").click(function () {
                $("#search-input").toggle();
                $("#search-icon").toggle();
            });
            $(window).click(function (e) {
                if (!document.getElementById('search-bar').contains(e.target)) {
                    $("#search-input").hide();
                    $("#search-icon").show();
                }
            });
            if (info.selfAccess) {
                $("#quick-access-collapse").click(function () {
                    $("#collapse-panel").toggle();
                });
                if (quickAccess) {
                    $("#collapse-panel").toggle();
                }
                layui.use('form', function () {
                    var form = layui.form;
                    form.render();

                    form.on('select(protocol)', function (data) {
                        if (data.value == "ssh") {
                            $("input[name='goUrl']").attr("placeholder", "输入 [地址:端口]，eg：192.168.0.1:22");
                        } else if (data.value == "telnet") {
                            $("input[name='goUrl']").attr("placeholder", "输入 [地址:端口]，eg：192.168.0.1:23");
                        } else if (data.value == "rdp") {
                            $("input[name='goUrl']").attr("placeholder", "输入 [地址:端口]，eg：192.168.0.1:3389");
                        } else if (data.value == "vnc") {
                            $("input[name='goUrl']").attr("placeholder", "输入 [地址:端口]，eg：192.168.0.1:5901");
                        } else if (data.value == "http" || data.value == "https") {
                            $("input[name='goUrl']").attr("placeholder", "输入域名或链接直接访问校内资源或图书馆资源");
                        }
                    })
                });
            }
            if (info.initPassword && info.userType != 'out') {
                var layer_index = layer.open({
                    shade: 0,
                    type: 4,
                    closeBtn: 2,
                    content: '<p style="color:#000000">您使用的是初始密码，存在安全隐患，请尽快<a style="color:#1B9EF3" href="/person-manage">修改密码</a></p>',
                })
                $('#layui-layer' + layer_index).css({right: '10px', left: 'auto', top: '65px', "z-index": 99});
                $('#layui-layer' + layer_index + ' .layui-layer-content').css({background: '#FFD5D5'});
                $('#layui-layer' + layer_index + ' i').css({display: 'none'});
            }
            loadBody();
        }
    })
}

var loadBody = function () {
    $.ajax({
        url: '/user/portal_groups',
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (res) {
            if (res.noAllAccess) {
                $("#container-body").html('<div class="content">您无权限访问任何数据</div>')
                $("#quick-access-collapse").removeClass("layui-show-sm-inline-block layui-show-xs-inline-block").hide()
                return
            }
            var sidebarHtml = getPortalGroupSidebarHtml(res)
            var contentHtml = getPortalGroupHtml(res)
            $("#vpn-content").append(getHistory() + getCollect() + sidebarHtml + contentHtml)
            if (res.bastion.length > 0) {
                initBastionTree(res.bastion)
            }
            $("button#go").click(function () {
                var url = $("input[name='goUrl']").val().trim();
                go(url);
            });

            $("input[name='goUrl']").keydown(function (e) {
                if (e.keyCode == 13) {
                    var url = $("input[name='goUrl']").val().trim();
                    go(url);
                }
            })
            $(document).on('click', '.bastion-item', function () {
                var url = $(this).data('url');
                $("#aHref").attr("href", url);
                document.getElementById("aHref").click();
            });
            $(document).on('click', '.sidebar-tree__item a', function (e) {
                e = e || window.event;
                e.preventDefault();
                group = $(this).data('group');
                // var target = $(this).prop('hash');
                $('html,body').scrollTop($("#" + group).offset().top);
            });
            $(".vpn-content-block-panel__image, .vpn-content-block-panel__content").click(function () {
                var url = $(this).parent().data('url');
                if ($(this).parent().data('type') == "vpn") {
                    go(url);
                } else {
                    $("#aHref").attr("href", url);
                    document.getElementById("aHref").click();
                }
            });
            getRecentList()
            getCollections(function (data) {
                collectionData = data
                initCollectionCss()
                addHtmlToCollect(collectionData)
            });
            $(".layui-icon-rate").click(function () {
                collectIconClickFunction($(this));
            });
        }
    })
}

function initBastionTree(bastionNodes) {
    var setting = {
        data: {
            simpleData: {
                enable: true
            },
        },
        callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
                reloadBastionList([treeNode]);
            }
        }
    };
    if (bastionNodes.length > 0 && bastionNodes[0].name == "root") {
        bastionNodes[0].name = '全部'
    }
    // replace icon
    replaceIcon(bastionNodes);
    $.fn.zTree.init($('#ztree'), setting, bastionNodes);
    // init bastion list
    reloadBastionList(bastionNodes);
    var ztree = $.fn.zTree.getZTreeObj("ztree");
    ztree.expandNode(ztree.getNodes()[0], null, null, false)
}

function replaceIcon(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].icon = nodes[i].icon.replace('/wengine-vpn/js/guacamole/css/img', '/wengine-vpn/js/guacamole/css/img/colorful');
        if (nodes[i].children.length > 0) {
            replaceIcon(nodes[i].children);
        }
    }
}

function reloadBastionList(nodes) {
    var children = getNodeLeaf(nodes);

    // add dom
    $("#vpn-bastion-list").empty();
    for (var i = 0; i < children.length; i++) {
        $("#vpn-bastion-list").append('\
            <div class="layui-col-xs6 layui-col-sm4 layui-col-md3 layui-col-lg3" style="padding: 5px;cursor: pointer;">\
                <div class="bastion-item"\
                    data-url="/connection/' + children[i].bastion.id + '"\
                    data-search="' + children[i].bastion.name + '_' + children[i].bastion.id + '"\
                    title="' + children[i].bastion.name + '"\
                >\
                    <div class="bastion-item__image">\
                        <img src="' + children[i].icon + '" />\
                    </div>\
                    <div class="bastion-item__content">\
                        <p class="bastion-item__title">' + children[i].bastion.name + '</p>\
                        <p class="bastion-item__address">' + children[i].bastion.protocol + '://' + children[i].bastion.address + ':' + children[i].bastion.port + '</p>\
                    </div>\
                </div>\
            </div>');
    }
}

function getNodeLeaf(nodes) {
    var children = [];
    for (var j = 0; j < nodes.length; j++) {
        if (nodes[j].type == "connection") {
            children.push(nodes[j]);
        } else {
            subChildren = getNodeLeaf(nodes[j].children);
            if (subChildren.length > 0) {
                children = children.concat(subChildren);
            }
        }
    }
    return children;
}

var recentData = [];

function getRecentList() {
    $.ajax({
        url: "/user/recent?isPortal=true",
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (res) {
            recentData = res.data
            addHtmlToHistory(recentData)
        }
    })
}

function updateRecentList(data) {
    $.ajax({
        url: "/user/recent",
        dataType: 'json',
        type: 'POST',
        cache: false,
        data: {
            'recent_list': JSON.stringify(data)
        },
        success: function (res) {
        }
    })
}

function addHtmlToHistory(data) {
    var htmlText = '<div class="layui-col-xs12 vpn-content-block__title">最近访问</div>';
    var sidebarHtml = '<div id="historySideBar" class="sidebar-tree__item"><a data-group="history">最近访问</a></div>';
    if (data.length > 0) {
        for (var i in data) {
            var logo;
            if (data[i].url.split("://").length > 1) {
                logo = getLogo(data[i].url.split("://")[1].split("/")[0]);
            } else {
                logo = getLogo(data[i].url.split("://")[0].split("/")[0]);
            }
            data[i].logo = logo;
            htmlText += '<div data-index="' + i + '" class="vpn-block-item layui-col-xs12 layui-col-sm6 layui-col-md4 layui-col-lg3" style="padding: 10px 10px 10px 0px;">\
                <div class="vpn-content-block-panel"\
                    data-url="' + data[i].url + '"\
                    data-search="' + data[i].title + '"\
                    data-type="vpn"\
                    title="' + data[i].title + '"\
                >\
                    <div class="vpn-content-block-panel__image">\
                        ' + (data[i].logo ? '<div style="background:#fff;">\
                            <img src="/wengine-vpn/js/image/portal_logos/' + data[i].logo + '" alt="" style="width: 100%;height: 100%;background:#fff;">\
                        </div>' : '<div><span>' + data[i].title[0] + '</span></div>') + '\
                    </div>\
                    <div class="vpn-content-block-panel__content">\
                        <p>' + data[i].title + '</p>\
                        <p class="vpn-content-block-panel__url">' + data[i].url + '</p>\
                    </div>\
                    <div class="vpn-content-block-panel__collect_ed">\
                        <i class="layui-icon layui-icon-delete"></i>\
                    </div>\
                </div>\
            </div>';
        }
        $("#history").addClass("layui-row vpn-content-block");
        $("#history").html(htmlText);
        if ($("#historySideBar").html() == undefined) {
            $(".sidebar-tree").html(sidebarHtml + $(".sidebar-tree").html())
        }

        $("#history").sortable({
            items: "> div.vpn-block-item",
            scroll: false,
            delay: 150,
            update: function (event, ui) {
                var newOrder = [];
                $("#history .vpn-block-item").each(function (i, e) {
                    newOrder.push($(e).data("index"));
                })
                var newRecentData = newOrder.map(function (v, i) {
                    return recentData[v]
                })
                recentData = newRecentData;
                updateRecentList(recentData)
                addHtmlToHistory(recentData)
            }
        }).disableSelection().off('click').on("click", ".layui-icon-delete", function () {
            var index = $(this).parent().parent().parent().data("index");
            recentData.splice(index, 1);
            addHtmlToHistory(recentData)
            updateRecentList(recentData)
        }).on("click", ".vpn-content-block-panel__image, .vpn-content-block-panel__content", function () {
            var url = $(this).parent().data('url');
            console.log(url)
            console.log($(this).parent().data('type'))
            if ($(this).parent().data('type') == "vpn") {
                go(url)
            } else {
                $("#aHref").attr("href", url);
                document.getElementById("aHref").click();
            }
        });
    } else {
        $("#history").removeClass("layui-row").removeClass("vpn-content-block");
        $("#history").html("");
        if ($("#historySideBar").html() != undefined) {
            $("#historySideBar").remove();
        }
    }
}

var collectionData = [];
var collectionUrls = [];

function initCollectionCss() {
    collectionUrls = collectionData.map(function (item) {
        return item.url
    })
    $(".vpn-content-block-panel__collect_ed").each(function (i, e) {
        var url = $(e).data("url")
        if (collectionUrls.indexOf(url) != -1) {
            $(e).removeClass("vpn-content-block-panel__collect_ed").addClass("vpn-content-block-panel__collect")
        }
    });
    $(".vpn-content-block-panel__collect").each(function (i, e) {
        var url = $(e).data("url")
        if (collectionUrls.indexOf(url) == -1) {
            $(e).removeClass("vpn-content-block-panel__collect").addClass("vpn-content-block-panel__collect_ed")
        }
    });
}

function addUserCollection(item) {
    addCollection(item, function (data) {
        collectionData = data
        initCollectionCss()
        addHtmlToCollect(collectionData)
        getRecentList()
    })
}

function deleteUserCollection(url) {
    cancelColletion({url: url}, function (data) {
        collectionData = data
        addHtmlToCollect(collectionData)
        initCollectionCss()
        getRecentList()
    })
}

function updateUserCollectionOrder() {
    updateCollections({
        'resources': JSON.stringify(collectionData)
    }, function (data) {

    })
}

function collectIconClickFunction(element) {
    var url = element.parent().data("url");
    var redirect = element.parent().data("redirect");
    var type = element.parent().data("type");
    var logo = element.parent().data("logo");
    var name = element.parent().data("name");
    var detail = element.parent().data("detail");

    if (element.parent().hasClass("vpn-content-block-panel__collect_ed")) {
        element.parent().removeClass("vpn-content-block-panel__collect_ed").addClass("vpn-content-block-panel__collect");
        addUserCollection({url: url, redirect: redirect, type: type, logo: logo, detail: detail, name: name});
    } else {
        element.parent().removeClass("vpn-content-block-panel__collect").addClass("vpn-content-block-panel__collect_ed");
        deleteUserCollection(url);
    }
}

function addHtmlToCollect(data) {
    var htmlText = '<div class="layui-col-xs12 vpn-content-block__title">我的收藏</div>';
    var sidebarHtml = '<div id="collectSideBar" class="sidebar-tree__item"><a data-group="collect">我的收藏</a></div>'
    if (data.length > 0) {
        $("#collect").addClass("layui-row vpn-content-block");
        $("#collect").html(htmlText);
        if ($("#collectSideBar").html() == undefined) {
            $(".sidebar-tree").html(sidebarHtml + $(".sidebar-tree").html())
        }

        for (var i in data) {
            var detail = data[i];
            if (detail != undefined) {
                htmlText += '<div data-index="' + i + '" class="vpn-block-item layui-col-xs12 layui-col-sm6 layui-col-md4 layui-col-lg3" style="padding: 10px 10px 10px 0px;">\
                    <div class="vpn-content-block-panel"\
                        data-url="' + detail.url + '"\
                        data-search="' + detail.name + '_' + detail.detail + '"\
                        data-type="' + detail.type + '"title="' + detail.name + '"\
                        title="' + detail.name + '"\
                    >\
                        <div class="vpn-content-block-panel__image">\
                            ' + (detail.logo ? '<div style="background:#fff;">\
                                <img src="/wengine-vpn/js/image/portal_logos/' + detail.logo + '" alt="" style="width: 100%;height: 100%;background:#fff;">\
                            </div>' : '<div><span>' + detail.name[0] + '</span></div>') + '\
                        </div>\
                        <div class="vpn-content-block-panel__content">\
                            <p>' + detail.name + '</p>\
                            <p class="vpn-content-block-panel__url">' + detail.detail + '</p>\
                        </div>\
                        <div class="vpn-content-block-panel__collect"\
                            data-url="' + detail.url + '"\
                            data-redirect="' + detail.redirect + '"\
                            data-name="' + detail.name + '"\
                            data-type="' + detail.type + '"\
                            data-logo="' + detail.logo + '"\
                            data-detail="' + detail.detail + '"\
                        >\
                            <i class="layui-icon layui-icon-rate"></i>\
                        </div>\
                    </div>\
                </div>';
            }
        }

        $("#collect").addClass("layui-row vpn-content-block");
        $("#collect").html(htmlText);

        $("#collect").sortable({
            items: "> div.vpn-block-item",
            scroll: false,
            delay: 150,
            update: function (event, ui) {
                var newOrder = [];
                $("#collect .vpn-block-item").each(function (i, e) {
                    newOrder.push($(e).data("index"));
                })
                var newCollectData = newOrder.map(function (v, i) {
                    return collectionData[v]
                })
                collectionData = newCollectData;
                updateUserCollectionOrder()
            }
        }).disableSelection().off('click').on("click", ".layui-icon-rate", function () {
            collectIconClickFunction($(this));
        }).on("click", ".vpn-content-block-panel__image, .vpn-content-block-panel__content", function () {
            var url = $(this).parent().data('url');
            console.log(url)
            console.log($(this).parent().data('type'))
            if ($(this).parent().data('type') == "vpn") {
                go(url);
            } else {
                $("#aHref").attr("href", url);
                document.getElementById("aHref").click();
            }
        });
    } else {
        $("#collect").removeClass("layui-row").removeClass("vpn-content-block");
        $("#collect").html("");
        if ($("#collectSideBar").html() != undefined) {
            $("#collectSideBar").remove();
        }
    }
}

function getLogo(url) {
    var elements = $(".vpn-content-block-panel").get()
    for (var i in elements) {
        var domain = '';
        var logoDomain = $(elements[i]).data("url");
        if (/^\/\//.test(logoDomain)) {
            domain = logoDomain.split('//')[1].split("/")[0];
        } else {
            var h = logoDomain.split('://');
            if (h.length > 1) {
                domain = logoDomain.split('://')[1].split("/")[0];
            } else {
                domain = logoDomain.split('://')[0].split("/")[0];
            }
        }
        if (domain === url) {
            return $(elements[i]).data("logo")
        }
    }
}

var loadBottomStat = function () {
    $.ajax({
        url: "/user/bottomStat",
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (res) {
            console.log(res.data)
            $("#footer").html($("#footer").html() + getBottomStatHtml(res.data))
        }
    })
}

var getBottomStatHtml = function (data) {
    if (data.year === undefined) {
        return ''
    }
    return '<br/>年使用人次: ' + data.year + '&nbsp; 月使用人次:' + data.month + '&nbsp; 日使用人次:' + data.day + '&nbsp; 当前在线人数：' + data.now
}