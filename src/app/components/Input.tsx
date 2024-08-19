import "./Input.css";

type InputProps = {
  text: string;
  handleUpdate: (event: React.FormEvent<HTMLTextAreaElement>) => void;
};

export default function Input({ text, handleUpdate }: Readonly<InputProps>) {
  return (
    <section className="input">
      <label htmlFor="input">Enter your text here:</label>
      <textarea id="input" value={text} onChange={handleUpdate}></textarea>
    </section>
  );
}
