load("@build_bazel_rules_nodejs//:index.bzl", "generated_file_test", "pkg_npm")
load("//tools:index.bzl", "check_format", "generate_src_file", "ts_compile")
load("//tools:jest.bzl", "jest_test")

PACKAGE_NAME = "ecma402-abstract"

pkg_npm(
    name = PACKAGE_NAME,
    package_name = "@formatjs/%s" % PACKAGE_NAME,
    srcs = [
        "LICENSE.md",
        "README.md",
    ],
    deps = [
        ":dist",
    ],
)

alias(
    name = "publish",
    actual = "%s.publish" % PACKAGE_NAME,
)

alias(
    name = "pack",
    actual = "%s.pack" % PACKAGE_NAME,
)

SRCS = glob(
    [
        "**/*.ts",
        "NumberFormat/*.json",
    ],
    exclude = [
        "tools/*.ts",
        "tests/*.ts",
    ],
)

SRC_DEPS = []

ts_compile(
    name = "dist",
    package_name = "@formatjs/%s" % PACKAGE_NAME,
    srcs = SRCS,
    skip_esm = False,
    deps = SRC_DEPS,
)

jest_test(
    name = "unit",
    srcs = SRCS + glob([
        "tests/**/*.ts",
        "tests/**/*.tsx",
        "tests/**/*.snap",
    ]),
    deps = SRC_DEPS,
)

generated_file_test(
    name = "tsconfig_json",
    src = "tsconfig.json",
    generated = "//tools:tsconfig.golden.json",
)

# digit-mapping
generate_src_file(
    name = "digit-mapping",
    src = "NumberFormat/digit-mapping.json",
    entry_point = "tools/digit-mapping.ts",
)

check_format(
    name = "prettier",
    srcs = glob(
        [
            "**/*",
        ],
        exclude = [
            "CHANGELOG.md",
            "NumberFormat/digit-mapping.json",
        ],
    ),
)
