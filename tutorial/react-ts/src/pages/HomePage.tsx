import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const links = [
  {
    path: `api/mongodb`,
  },
  {
    path: `api/mysql`,
  },
  {
    path: `zustand`,
  },
  {
    path: `redux-toolkit`,
  },
];

const HomePage = () => {
  return (
    <div className="mx-auto max-w-7xl w-full space-y-12 p-3 py-12">
      <div className="mx-auto flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
      <ul className="flex flex-wrap justify-center gap-3">
        {links.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              <Button>{item.path}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
