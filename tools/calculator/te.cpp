#include <emscripten/bind.h>

#include <string>

#include "tinyexpr.h"

using namespace emscripten;

std::string calculate(std::string expression) {
    int error;
    double result = te_interp(expression.c_str(), &error);
    if (error)
        return "!" + std::to_string(error);
    else
        return std::to_string(result);
}

EMSCRIPTEN_BINDINGS(tinyexpr) { function("calculate", &calculate); }