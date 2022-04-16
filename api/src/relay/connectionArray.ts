import * as Relay from "./types";

const CURSOR_PREFIX = "cursor:";

function base64Encode(str: string) {
  return Buffer.from(str, "utf8").toString("base64");
}

function base64Decode(str: string) {
  return Buffer.from(str, "base64").toString("utf8");
}

export function identifierToCursor(id: string) {
  return base64Encode(CURSOR_PREFIX + id);
}

export function cursorToIdentifier(cursor: string) {
  return base64Decode(cursor).replace(CURSOR_PREFIX, "");
}

interface DBModel {
  id: string;
}

export function connectionFromPromisedArray<T extends DBModel>(
  dataPromise: Promise<ReadonlyArray<T>>,
  args: Relay.ConnectionArguments
): Promise<Relay.Connection<T>> {
  return dataPromise.then((data) => connectionFromArray(data, args));
}

export function connectionFromArray<T extends DBModel>(
  data: ReadonlyArray<T>,
  args: Relay.ConnectionArguments
): Relay.Connection<T> {
  const { after, before, first, last } = args;
  const arrayLength = data.length;
  let endOfTrim = data.length;
  let startOfTrim = 0;
  let hasNextPage = false;
  let hasPreviousPage = false;

  if (first) {
    if (after) {
      hasPreviousPage = true;
    }
    if (arrayLength > first) {
      hasNextPage = true;
      endOfTrim--;
    }
  } else if (last) {
    if (before) {
      hasNextPage = true;
    }
    if (arrayLength > last) {
      hasPreviousPage = true;
      startOfTrim++;
    }
  }

  // Trim down supplied array before mapping over it.
  const slice = data.slice(startOfTrim, endOfTrim);

  const edges = slice.map((item) => ({
    cursor: identifierToCursor(item.id),
    node: item,
  }));

  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];

  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
    },
  };
}
