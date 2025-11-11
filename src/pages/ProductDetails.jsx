import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name}/>
      <p>{product.category}</p>
      <p>{product.price === 0 ? "Free for Adoption" : `$${product.price}`}</p>
      <p>{product.location}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;