import { useParams, Link } from 'react-router-dom';

export default function SingleView({ data }) {
  // get the id from the url
  const { id } = useParams();

  // find the product
  const product = data.find((product) => product.id === id);

  if (!product) {
    return (
      <div className="pa4">
        <h2>Product not found</h2>
        <Link to="/" className="blue link">Back to Products</Link>
      </div>
    );
  }

  const { user } = product;
  const title = product.description ?? product.alt_description;

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      {/* USER HEADER */}
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={user.profile_image["medium"]}
            className="br-100 h3 w3 dib"
            alt={user.instagram_username}
          />
          <h1 className="ml3 f4">
            {user.first_name} {user.last_name}
          </h1>
        </div>
      </div>

      {/* IMAGE */}
      <div className="aspect-ratio aspect-ratio--4x3">
        <img
          src={product.urls["regular"]}
          alt={title}
          className="aspect-ratio--object cover"
        />
      </div>

      {/* DETAILS */}
      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>

          <h2 className="f4 mt2 mb3">{title}</h2>

          <p className="gray">{product.likes} Likes</p>

          <Link to="/" className="link blue mt3 db">
            ← Back to Products
          </Link>
        </div>
      </div>
    </article>
  );
}
