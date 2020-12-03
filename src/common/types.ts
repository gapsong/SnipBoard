interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
}

interface Meta {
    id: string;
    url: string;
}

export type ViewConfig = Meta & Rectangle;

export type DragConfig = { id: string; cursorX: number; cursorY: number };
