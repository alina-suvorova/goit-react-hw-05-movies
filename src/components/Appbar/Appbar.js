import { Navigation } from "../Navigation/Navigation";
import s from "./Appbar.module.css";

export default function Appbar({ clearQuery }) {
    return (
        <header className={s.header}>
            <Navigation changeQuery={clearQuery} />
        </header>
    );
}