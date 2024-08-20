import styles from "./ChunkButton.module.css";

type ChunkButtonProps = {
  text: string;
  chunkText: () => void;
  isPending?: boolean;
};

export default function ChunkButton({
  text,
  chunkText,
  isPending,
}: ChunkButtonProps) {
  return (
    <button
      onClick={chunkText}
      disabled={text.trim() === "" || isPending}
      aria-disabled={text.trim() === "" || isPending}
      className={styles["chunk-btn"]}
    >
      {isPending ? "Chunking..." : "Chunk!"}
    </button>
  );
}
