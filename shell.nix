with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "dashboard";

  buildInputs = [
    jq
    nodejs
    yarn
  ];
}