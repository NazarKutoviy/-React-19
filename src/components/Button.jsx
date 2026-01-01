export default function Button({ onClick }) {
  return (
    <div style={{ textAlign: "center" }}>
      <button className="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
