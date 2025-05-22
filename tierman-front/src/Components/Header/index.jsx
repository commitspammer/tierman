import style from "./style.module.scss";

export default function Header() {
  return (
    <nav className={style.navbar}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <a href="#">Logo</a>
        </div>
        <ul className="flex gap-6">
          <li>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Categorias
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Criar Templete
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
