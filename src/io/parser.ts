export function parseGameSettings(): GameSettings {
  var inputs: string[] = readline().split(' ');
  const baseX = parseInt(inputs[0]);
  const baseY = parseInt(inputs[1]);
  const heroesPerPlayer = parseInt(readline());

  return {
    baseX,
    baseY,
    heroesPerPlayer
  };
}

export function parseGameState(): GameState {
  const state: GameState = {
    health: 0,
    mana: 0,
    entities: []
  };

  for (let i = 0; i < 2; i++) {
    var inputs: string[] = readline().split(' ');
    state.health = parseInt(inputs[0]);
    state.mana = parseInt(inputs[1]);
  }

  const entityCount = parseInt(readline());
  for (let i = 0; i < entityCount; i++) {
    var inputs: string[] = readline().split(' ');
    const id = parseInt(inputs[0]);
    const type = parseInt(inputs[1]);
    const x = parseInt(inputs[2]);
    const y = parseInt(inputs[3]);
    const shieldLife = parseInt(inputs[4]);
    const isControlled = parseInt(inputs[5]);
    const health = parseInt(inputs[6]);
    const vx = parseInt(inputs[7]);
    const vy = parseInt(inputs[8]);
    const nearBase = parseInt(inputs[9]);
    const threatFor = parseInt(inputs[10]);

    state.entities.push({
      id,
      type: parseType(type),
      x,
      y,
      shieldLife,
      isControlled: isControlled === 1,
      health,
      vx,
      vy,
      nearBase: nearBase === 1,
      threatFor: parseThreatFor(threatFor)
    })
  }

  return state;
}

function parseType(type: number): EntityType {
  switch (type) {
    case 0: return 'monster';
    case 1: return 'my-hero';
    case 2: return 'opponent-hero';
  }
}

function parseThreatFor(threatFor: number): ThreatFor {
  switch (threatFor) {
    case 0: return 'nobody';
    case 1: return 'my-base';
    case 2: return 'opponent-base';
  }
}

export interface GameSettings {
  /**
   * The corner of the map representing your base
   */
  baseX: number;
  /**
   * The corner of the map representing your base
   */
  baseY: number;
  /**
   * Always 3
   */
  heroesPerPlayer: number;
}

export type EntityType ='my-hero' | 'opponent-hero' | 'monster';

export type ThreatFor = 'my-base' | 'opponent-base' | 'nobody';
export interface Entity {
  /**
   * Unique identifier
   */
  id: number;
  /**
   * monster, your hero, opponent hero
   */
  type: EntityType;
  /**
   * Position of this entity
   */
  x: number;
  /**
   * Position of this entity
   */
  y: number;
  /**
   * Count down until shield spell fades. Casting a shield protects for 12 rounds.
   */
  shieldLife: number;
  /**
   *  Whether this entity is under a control spell
   */
  isControlled: boolean;
  /**
   * Remaining health of this monster
   */
  health: number;
  /**
   * Trajectory of this monster. It will add this value to its position next turn.
   */
  vx: number;
  /**
   * Trajectory of this monster. It will add this value to its position next turn.
   */
  vy: number;
  /**
   * false=monster with no target yet, true=monster targeting a base
   */
  nearBase: boolean;
  /**
   * Given this monster's trajectory, is it a threat to your base, your opponent's base, neither
   */
  threatFor: ThreatFor;
}

export interface GameState {
  /**
   * Your base health
   */
  health: number;
  /**
   * Spend ten mana to cast a spell
   */
  mana: number;
  /**
   * All the heroes and monsters you can see
   */
  entities: Entity[];
}
