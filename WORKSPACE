# Bazel workspace created by @bazel/create 1.7.0

# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/master/build-ref.html#workspace
workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "formatjs",
    # Map the @npm bazel workspace to the node_modules directory.
    # This lets Bazel use the same node_modules as other local tooling.
    managed_directories = {
        "@npm": ["node_modules"],
        # "@website_npm": ["website/node_modules"],
    },
)

_ESBUILD_VERSION = "0.11.5"

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

# Install the nodejs "bootstrap" package
# This provides the basic tools for running and packaging nodejs programs in Bazel
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "f533eeefc8fe1ddfe93652ec50f82373d0c431f7faabd5e6323f6903195ef227",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/3.3.0/rules_nodejs-3.3.0.tar.gz"],
)

IANA_TZ_VERSION = "2021a"

http_archive(
    name = "tzdata",
    build_file = "@//:packages/intl-datetimeformat/tzdata.BUILD",
    sha256 = "39e7d2ba08c68cbaefc8de3227aab0dec2521be8042cf56855f7dc3a9fb14e08",
    urls = ["https://data.iana.org/time-zones/releases/tzdata%s.tar.gz" % IANA_TZ_VERSION],
)

http_archive(
    name = "tzcode",
    build_file = "@//:packages/intl-datetimeformat/tzcode.BUILD",
    sha256 = "eb46bfa124b5b6bd13d61a609bfde8351bd192894708d33aa06e5c1e255802d0",
    urls = ["https://data.iana.org/time-zones/releases/tzcode%s.tar.gz" % IANA_TZ_VERSION],
)

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "npm_install")

node_repositories(
    node_version = "14.9.0",
    package_json = ["//:package.json"],
)

http_archive(
    name = "esbuild_darwin",
    build_file_content = """exports_files(["bin/esbuild"])""",
    sha256 = "98436890727bdb0d4beddd9c9e07d0aeff0e8dfe0169f85e568eca0dd43f665e",
    strip_prefix = "package",
    urls = [
        "https://registry.npmjs.org/esbuild-darwin-64/-/esbuild-darwin-64-%s.tgz" % _ESBUILD_VERSION,
    ],
)

http_archive(
    name = "esbuild_windows",
    build_file_content = """exports_files(["esbuild.exe"])""",
    sha256 = "589c8ff97210bd41de106e6317ce88f9e88d2cacfd8178ae1217f2b857ff6c3a",
    strip_prefix = "package",
    urls = [
        "https://registry.npmjs.org/esbuild-windows-64/-/esbuild-windows-64-%s.tgz" % _ESBUILD_VERSION,
    ],
)

http_archive(
    name = "esbuild_linux",
    build_file_content = """exports_files(["bin/esbuild"])""",
    sha256 = "113c2e84895f4422a3676db4e15d9f01b2b4fac041edab25284fdb9574ba58a0",
    strip_prefix = "package",
    urls = [
        "https://registry.npmjs.org/esbuild-linux-64/-/esbuild-linux-64-%s.tgz" % _ESBUILD_VERSION,
    ],
)

# The npm_install rule runs yarn anytime the package.json or yarn.lock file changes.
# It also extracts and installs any Bazel rules distributed in an npm package.

npm_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    package_json = "//:package.json",
    package_lock_json = "//:package-lock.json",
)

# Setup skylib
http_archive(
    name = "bazel_skylib",
    sha256 = "97e70364e9249702246c0e9444bccdc4b847bed1eb03c5a3ece4f83dfe6abc44",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.0.2/bazel-skylib-1.0.2.tar.gz",
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.0.2/bazel-skylib-1.0.2.tar.gz",
    ],
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

# multirun is written in Go and hence needs rules_go to be built.
# See https://github.com/bazelbuild/rules_go for the up to date setup instructions.
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "08c3cd71857d58af3cda759112437d9e63339ac9c6e0042add43f4d94caf632d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.24.2/rules_go-v0.24.2.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.24.2/rules_go-v0.24.2.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains()

git_repository(
    name = "com_github_ash2k_bazel_tools",
    commit = "cbe7710fca61d5cc585af4ea29b0e1423e1ac17d",
    remote = "https://github.com/ash2k/bazel-tools.git",
    shallow_since = "1615605582 +1100",
)

load("@com_github_ash2k_bazel_tools//multirun:deps.bzl", "multirun_dependencies")

multirun_dependencies()

# buildifier

http_archive(
    name = "bazel_gazelle",
    sha256 = "b85f48fa105c4403326e9525ad2b2cc437babaa6e15a3fc0b1dbab0ab064bc7c",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.22.2/bazel-gazelle-v0.22.2.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.22.2/bazel-gazelle-v0.22.2.tar.gz",
    ],
)

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")

gazelle_dependencies()

_PROTOBUF_VERSION = "3.15.3"

http_archive(
    name = "com_google_protobuf",
    sha256 = "1c11b325e9fbb655895e8fe9843479337d50dd0be56a41737cbb9aede5e9ffa0",
    strip_prefix = "protobuf-%s" % _PROTOBUF_VERSION,
    urls = ["https://github.com/protocolbuffers/protobuf/archive/v%s.zip" % _PROTOBUF_VERSION],
)

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

_BUILDIFIER_VERSION = "4.0.0"

http_archive(
    name = "bazelbuild_buildtools",
    sha256 = "2adaafee16c53b80adff742b88bc90b2a5e99bf6889a5d82f22ef66655dc467b",
    strip_prefix = "buildtools-%s" % _BUILDIFIER_VERSION,
    url = "https://github.com/bazelbuild/buildtools/archive/%s.zip" % _BUILDIFIER_VERSION,
)

# Test262
new_local_repository(
    name = "com_github_tc39_test262",
    build_file = "@//:test262.BUILD",
    path = "test262",
)
