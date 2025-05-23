import { Link } from "react-router-dom";
import style from "./style.module.scss";

export default function Header() {
  return (
    <nav className={style.navbar}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">
            <img
              className={style.icon}
              src="assets/Tierman_logo.png"
              height="36px"
            />
          </Link>
        </div>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Categorias
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Criar Template
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
