import { useState, useEffect } from "react";
import { api } from "@/shared/api/endpoints";
import { PriceSuccessful } from "@/pages/PricePage/ui/PriceSuccesfull";

const CargoPricePage = () => {
    const [price, setPrice] = useState("");
    const [savedPrice, setSavedPrice] = useState<number | null>(null);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    useEffect(() => {
        const fetchPrice = async () => {
            const { data } = await api.get("/price/current");
            setSavedPrice(data.current_price);
        };

        fetchPrice();
    }, []);

    const handleSave = async () => {
        if (!price) return;

        try {
            const { data } = await api.post("/price/set", {
                current_price: Number(price),
            });

            setSavedPrice(Number(price));
            setIsSuccessOpen(true);
            setPrice("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Цена доставки
                </h2>

                <p className="mt-1 text-gray-500">
                    Укажите стоимость доставки за 1 кг
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-2 block text-sm text-gray-600">
                    Цена за 1 кг (сом)
                </label>

                <input
                    type="text"
                    value={price}
                    placeholder="Например: 87"
                    onChange={(e) =>
                        setPrice(
                            e.target.value.replace(/[^0-9.]/g, "")
                        )
                    }
                    className="
                        w-full rounded-xl border border-gray-200
                        bg-gray-50 px-4 py-3
                        focus:border-green-400
                        focus:ring-2 focus:ring-green-100
                    "
                />

                {savedPrice !== null && (
                    <p className="mt-3 text-sm text-green-600">
                        Текущая цена: <strong>{savedPrice} сом/кг</strong>
                    </p>
                )}

                <div className="mt-5 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="
                            rounded-xl
                            bg-green-600
                            px-6 py-3
                            font-medium
                            text-white
                            hover:bg-green-700
                        "
                    >
                        Сохранить
                    </button>
                </div>
            </div>

            <PriceSuccessful
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
            />
        </div>
    );
};

export default CargoPricePage;