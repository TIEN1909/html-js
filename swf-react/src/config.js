export const BASE_PATH = import.meta.env.BASE_URL || '/';

export const CHAPTERS = [
  { id: 1,  name: 'Numbers 1–10',   sub: 'Session 1',  url: `${BASE_PATH}session1/index.html`,  status: 'done'     },
  { id: 2,  name: 'Numbers 11–20',  sub: 'Session 2',  url: `${BASE_PATH}session2/index.html`,  status: 'done'     },
  { id: 3,  name: 'Numbers 21–30',  sub: 'Session 3',  url: `${BASE_PATH}session3/index.html`,  status: 'current'  },
  { id: 4,  name: 'Numbers 31–40',  sub: 'Session 4',  url: `${BASE_PATH}session4/index.html`,  status: 'locked'   },
  { id: 5,  name: 'Numbers 41–50',  sub: 'Session 5',  url: `${BASE_PATH}session5/index.html`,  status: 'locked'   },
  { id: 6,  name: 'Numbers 51–60',  sub: 'Session 6',  url: `${BASE_PATH}session6/index.html`,  status: 'locked'   },
  { id: 7,  name: 'Numbers 61–70',  sub: 'Session 7',  url: `${BASE_PATH}session7/index.html`,  status: 'locked'   },
  { id: 8,  name: 'Numbers 71–80',  sub: 'Session 8',  url: `${BASE_PATH}session8/index.html`,  status: 'locked'   },
  { id: 9,  name: 'Numbers 81–90',  sub: 'Session 9',  url: `${BASE_PATH}session9/index.html`,  status: 'locked'   },
  { id: 10, name: 'Numbers 91–100', sub: 'Session 10', url: `${BASE_PATH}session10/index.html`, status: 'locked'  },
];

export const PREV_SESSION = { id: 0, name: 'Intro', sub: 'Session 0', url: `${BASE_PATH}session0/index.html` };
export const STATUS_ICON  = { current: '▶', done: '✓', locked: '🔒' };

export const GAME = {
  FRAMES_PATH:     `${BASE_PATH}session1/frames/`,
  SOUNDS_PATH:     `${BASE_PATH}session1/sounds/`,
  TOTAL_FRAMES:    415,
  FPS:             24,
  PAN_START_FRAME: 216,
  JUMP_TO_FRAME:   415,
  AUDIO_PATH:      `${BASE_PATH}public/session1/sounds/lesson_audio.mp3`,
  LESSON_AUDIO:    `${BASE_PATH}public/session1/sounds/lesson_intro.mp3`,
  EGG_IMG:         `${BASE_PATH}images/shape17.svg`,
  PAN_IMG:         `${BASE_PATH}images/48.svg`,
  BG_SRC:          `${BASE_PATH}common/bg/eca_scr_1_kp_00_back.html`,
  EGG_POSITIONS: [
    { x: -73, y: 410 }, { x: -50, y: 383 }, { x: -12, y: 374 },
    { x: -14, y: 407 }, { x: -5,  y: 443 }, { x: 18,  y: 387 },
    { x: 50,  y: 378 }, { x: 44,  y: 414 }, { x: 70,  y: 443 },
    { x: 80,  y: 405 },
  ],
  ZONE_POSITIONS: [
    { x: 196, y: 19  }, { x: 261, y: 19  },
    { x: 200, y: 75  }, { x: 261, y: 75  },
    { x: 202, y: 131 }, { x: 257, y: 134 },
    { x: 201, y: 188 }, { x: 258, y: 188 },
    { x: 199, y: 241 }, { x: 260, y: 239 },
  ],
  ZONE_SIZE: 34,
  SEGMENT_A_END:   17,
  SEGMENT_B_START: 29,
};

export const DESIGN_W = 1536;
export const DESIGN_H = 703;

export const CANVAS_W = 590;
export const CANVAS_H = 410;
