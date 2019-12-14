with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "frontend-dashboard";

  buildInputs = [
    jq
    nodejs
    yarn
  ];

  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
    alias scripts='jq ".scripts" package.json'
  '';  
}