import { FC } from "react";
import styles from "./ingredient-icon.module.css";

interface IIngredientIconProps {
    img: string;
}

const IngredientIcon: FC<IIngredientIconProps> = ({ img }) => {
    return (
        <div className={styles.ImgFrame}>
            <img src={img} />
        </div>
    );
};
export { IngredientIcon };
