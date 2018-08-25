import fs = require('fs');

export interface FileDescriptor {
  path: string;
  external: boolean;
}

export async function getFileList(root: string): Promise<Set<FileDescriptor>> {
  return new Set([
    {
      path: 'one',
      external: false
    }
  ]);
}
