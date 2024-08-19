import styles from "./Chunk.module.css";

type ChunkProps = {
  previousText?: string;
  text: string;
  nextText?: string;
};

function findOverlapAtEnd(a: string, b: string) {
  if (b.length === 0) return "";
  if (a.endsWith(b)) return b;
  return findOverlapAtEnd(a, b.substring(0, b.length - 1));
}

function findOverlapAtStart(a: string, b: string) {
  if (b.length === 0) return "";
  if (a.startsWith(b)) return b;
  return findOverlapAtStart(a, b.substring(1));
}

function getStartOverlap(text: string, previousText?: string) {
  if (previousText) {
    return findOverlapAtStart(text, previousText);
  }
  return "";
}

function getEndOverlap(text: string, nextText?: string) {
  if (nextText) {
    return findOverlapAtEnd(text, nextText);
  }
  return "";
}

function overlapSpan(overlap: string) {
  return overlap ? <span className={styles.overlap}>{overlap}</span> : "";
}

export default function Chunk({
  previousText,
  text,
  nextText,
}: Readonly<ChunkProps>) {
  const startOverlap = getStartOverlap(text, previousText);
  const endOverlap = getEndOverlap(text, nextText);
  let middleText = text.replace(startOverlap, "").replace(endOverlap, "");
  return (
    <div className="card">
      {overlapSpan(startOverlap)}
      {middleText}
      {overlapSpan(endOverlap)}
    </div>
  );
}
