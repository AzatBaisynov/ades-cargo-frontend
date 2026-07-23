import { useState, useEffect } from "react";
import { api } from "@/shared/api/endpoints";
import { PriceSuccessful } from "@/pages/PricePage/ui/PriceSuccesfull";

const CargoPricePage = () => {
    const [price, setPrice] = useState("");
    const [savedPrice, setSavedPrice] = useState<number | null>(null);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPrice = async () => {
            const { data } = await api.get("/price/current");
            setSavedPrice(data.current_price);
        };

        fetchPrice();
    }, []);

    const handleSave = async () => {
        if (!price.trim()) {
            setError(true);
            return;
        }

        setError(false);

        try {
            await api.post("/price/set", {
                current_price: Number(price),
            });

            setSavedPrice(Number(price));
            setIsSuccessOpen(true);
            setPrice("");
        } catch {
            alert("Ошибка сохранения данных");
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
                    onChange={(e) => {
                        setPrice(e.target.value.replace(/[^0-9.]/g, ""));
                        setError(false);
                    }}
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

                <div className="mt-5 flex items-center justify-end gap-3">
                    {error && (
                        <span className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            ⚠️ Поле не может быть пустым!
                        </span>
                    )}

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