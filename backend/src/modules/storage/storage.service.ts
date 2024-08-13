import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'node:stream';

@Injectable()
export class StorageService {
  private blobServiceClient: BlobServiceClient;
  public constructor(private readonly configService: ConfigService) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING'),
    );
  }

  public async upload(
    containerName: string,
    content: Buffer,
    blobName: string,
  ) {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, content.length);

    return blockBlobClient.url;
  }

  public async download(
    containerName: string,
    blobName: string,
  ): Promise<Buffer> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    return this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody as Readable,
    );
  }

  private async streamToBuffer(readableStream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on('data', (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }
}
