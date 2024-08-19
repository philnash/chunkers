import styles from "./ChunkButton.module.css";

type ChunkButtonProps = {
  text: string;
  chunkText: () => void;
};

export default function ChunkButton({ text, chunkText }: ChunkButtonProps) {
  return (
    <button
      onClick={chunkText}
      disabled={text.trim() === ""}
      className={styles["chunk-btn"]}
    >
      Chunk!
    </button>
  );
}
