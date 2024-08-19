import { Chunks } from "../types";
import "./Output.css";

type OutputProps = {
  chunks: Chunks;
};

export default function Output({ chunks }: Readonly<OutputProps>) {
  return (
    <output>
      {chunks.map((chunk) => (
        <div className="card" key={chunk.id}>
          {chunk.chunk}
        </div>
      ))}
    </output>
  );
}
