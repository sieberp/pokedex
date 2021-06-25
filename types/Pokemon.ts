export default interface Pokemon {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  name: string;
  order: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default?: string;
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
