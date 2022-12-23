import { FC } from "react";
import styles from "./ingredient-icon.module.css";

interface IIngredientIconProps {
    img: string;
    others?: number;
}

const IngredientIcon: FC<IIngredientIconProps> = ({ img, others = -1 }) => {
    return (
        <div className={`${styles.ImgFrame} `}>
            <img
                className={`${others !== -1 ? styles.Blured : ""}`}
                height={50}
                width={100}
                src={img}
            />
            {others !== -1 && (
                <p
                    className={`${styles.Quantity} text text_type_digits-default`}
                >
                    +{others}
                </p>
            )}
        </div>
    );
};
export { IngredientIcon };
