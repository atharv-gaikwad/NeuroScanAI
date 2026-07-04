const images = [

    {
        title: "Decision Tree",
        file: "decision_tree_confusion_matrix.png",
    },

    {
        title: "Random Forest",
        file: "random_forest_confusion_matrix.png",
    },

    {
        title: "SVM",
        file: "svm_confusion_matrix.png",
    },

    {
        title: "KNN",
        file: "knn_confusion_matrix.png",
    },

    {
        title: "Logistic Regression",
        file: "logistic_regression_confusion_matrix.png",
    },

];

export default function ConfusionMatrices() {

    return (

        <div className="mt-14">

            <h2 className="text-4xl font-black mb-10">

                Confusion Matrices

            </h2>

            <div className="grid lg:grid-cols-2 gap-8">

                {images.map((img) => (

                    <div
                        key={img.title}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden"
                    >

                        <img
                            src={`http://127.0.0.1:8000/images/${img.file}`}
                            alt={img.title}
                            className="w-full"
                        />

                        <div className="p-5">

                            <h3 className="text-2xl font-bold">

                                {img.title}

                            </h3>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}