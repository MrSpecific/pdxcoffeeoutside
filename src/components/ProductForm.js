export default function ProductForm({ onSubmit }) {
  return (
    <form id="product-form" onSubmit={onSubmit}>
      <button type="submit">Add To Cart</button>
    </form>
  );
}
