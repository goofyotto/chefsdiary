import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function RecipeRoute({ }) {
    const navigate = useNavigate();
    const { recipe } = useContext(RecipeContext);

    return (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
            {recipe ? (
                <>
                    <div
                        style={{
                            display: "grid",
                            gap: "2px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            onClick={() => navigate("/recipe?id=" + recipe.id)}
                            size={"sm"}
                        >
                            <Icon path={mdiEyeOutline} size={0.7} />
                        </Button>
                        {/* <Button onClick={() => setShowRecipeForm(recipe)} size={"sm"}>
                            <Icon path={mdiPencil} size={0.7} />
                        </Button> */}
                    </div>
                </>
            ) : (
                "loading..."
            )}
        </div>
    );
}

function componentStyle() {
    return {
        margin: "12px auto",
        padding: "8px",
        display: "grid",
        gridTemplateColumns: "max-content auto 32px",
        columnGap: "8px",
        maxWidth: "640px",
    };
}

export default RecipeRoute;