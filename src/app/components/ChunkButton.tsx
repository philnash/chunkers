type ChunkButtonProps = {
  text: string;
  chunkText: () => void;
};

export default function ChunkButton({ text, chunkText }: ChunkButtonProps) {
  return (
    <button onClick={chunkText} disabled={text.trim() === ""}>
      Chunk!
    </button>
  );
}
