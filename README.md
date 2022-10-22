# Media Converter

[![Build Status](https://jenkins.imninja.eu/buildStatus/icon?job=media-converter%2Fmaster)](https://jenkins.imninja.eu/job/media-converter/job/master/)

## Setup

Node Packages Installieren `npm install`

### Dev Server

Development Server starten `npm run dev`

**Konvertierung von Dateien ist im DEV Server nicht möglich**

### Build Start

Projekt Builden `npm run build`

Projekt starten `node .`

Standardgemäss wird der Server auf Port `3000` gestartet, mit den Enviroment Variable `PORT` kann diese geändert werden.

Bsp: `PORT=5000 node .`

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
