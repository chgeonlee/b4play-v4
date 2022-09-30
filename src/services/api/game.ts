
const _fetch = async (leaf: string, params: { [name: string]: any }) => {
    const p = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    const l = [leaf, "?", p].join("");
    const url = ["http://api-v3.b4play.de:3000", "game-detail", l].join("/");
    
    return fetch(url).then((resp) => resp.json());
  };

  
export const getGameDetailImages = async ({ game_id }: GameDetailImageRequestType): Promise<ResponseType<GameDetailImageResponseDataType>> => {
  return _fetch("image", { game_id: game_id });
};

export const getGameSeries = async ({ game_id }: GameSeriesRequestType): Promise<ResponseType<GameSeriesDataType[]>> => {
  return _fetch("series", { game_id: game_id });
};

export const getGameSimilar = async ({ game_id }: GameSimilarRequestType): Promise<ResponseType<GameSimilarDataType[]>> => {
  return _fetch("similar", { game_id: game_id });
}



export enum ResponseCodeType {
  SUCCESS = "0000",
}

export interface ResponseType<T> {
  code: ResponseCodeType,
  data: T,
  msg: any,
}

export interface GameDetailImageRequestType {
  game_id: string;
}

export interface GameDetailImageResponseDataType {
  official_image : {
      rows: {
          type: string,
          id: number;
          game_id: string;
          img_url: string;
          video_url: string;
          is_title: number;
          img_width: string;
          img_height: string;
          total: number;
      }[],
      total: number,
  },
  screenshot : {
      rows: {
          type: string,
          id: number;
          game_id: string;
          img_url: string;
          video_url: string;
          is_title: number;
          img_width: string;
          img_height: string;
          total: number;
      }[],
      total: number,
  },
  official_video : {
      rows: {
          type: string,
          id: number;
          game_id: string;
          img_url: string;
          video_url: string;
          total: number;
      }[],
      total: number,
  },
  youtube_video: {
      rows: {
          type: string,
          id: number;
          game_id: string;
          img_url: string;
          video_url: string;
          total: number;
      }[],
      total: number,
  }
}

export interface GameSeriesRequestType {
  game_id: string;
}

export interface GameSeriesDataType {
  short_desc?: string;
  description?: string;
  game_id: string;
  img_url?: string;
  name_en?: string;
  name_ko?: string;
  b4_score?: string;
  low_price?: number;
  origin_id: number;
  video_url?: string;
  device_icon: string[]; //["Xbox", "PC", "VR"];
  released_at: string;
  released_at_str: string;
}

export interface GameSimilarRequestType {
  game_id: string;
}

export interface GameSimilarDataType {
  game_id: string;
  img_url: string | null;
  name_en: string | null;
  name_ko: string | null;
  b4_score: string | null;
  low_price: number | null;
  origin_id: number | null;
  video_url: string | null;
  device_icon: string[];
  released_at: string;
  released_at_str: string;
}
