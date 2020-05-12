const ENUM_TYPE_NO_CONTENT_TYPE = "BAD_CONTENT_TYPE";

export const CONTENT_TYPE_MAP = {
  "application/x-mpegURL": ENUM_TYPE_HLS,
  "application/octet-stream": ENUM_TYPE_NO_CONTENT_TYPE,
  "binary/octet-stream": ENUM_TYPE_NO_CONTENT_TYPE,
  "application/vnd.apple.mpegurl": ENUM_TYPE_HLS,
  "application/dash+xml": ENUM_TYPE_MPEGDASH,
  "application/vnd.apple.mpegurl;charset=UTF-8": ENUM_TYPE_HLS,
  "application/vnd.ms-sstr+xml": ENUM_TYPE_MSS
};

export const ENUM_TYPE_HLS = "HLS";
export const ENUM_TYPE_MPEGDASH = "MPD";
export const ENUM_TYPE_MSS = "MSS";

export const DEFAULT_OPTIONS = {
  skin: true
};
