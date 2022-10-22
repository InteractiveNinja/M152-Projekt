# Media Converter

[![Build Status](https://jenkins.imninja.eu/buildStatus/icon?job=media-converter%2Fmaster)](https://jenkins.imninja.eu/job/media-converter/job/master/)

## Setup

Install Node Packages `npm install`

### Dev Server

Start Development Server `npm run dev`

**Conversion of files is not possible in DEV Server**

### Build Start

Build Project `npm run build`

Start Project `node .`

By default, the server is set to port `3000`, with the Environment Variable `PORT` this can be changed.

`PORT=5000 node .`

## Requirements

- Node
  - Version v16.18.0
- NPM
  - Version 8.19.2

## How does it work?

1. File gets uploaded to Browsers Memory (limited to max 2GB Files)
2. Output format gets chosen, common filetypes are available
3. FFMPEG gets downloaded and used via WebAssembly
4. File gets converted with FFMPEG
5. File blob gets returned and made available to download
