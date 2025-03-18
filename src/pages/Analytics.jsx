import React, { useState } from "react";
import { motion } from "framer-motion";

const Analytics = () => {
    const analyticsData = {
        "confusion_matrix": {
            title: "Confusion Matrix",
            image: new URL('../assets/confusion_matrix.png', import.meta.url).href,
            description: `The matrix shows the model's predictions vs actual outcomes:
                • ✅ True Negatives (260) – Correctly predicted safe road conditions.
                • ❌ False Positives (90) – Incorrectly predicted a hazard when the road was safe.
                • ❌ False Negatives (50) – Incorrectly predicted safe road when there was hazard.
                • ✅ True Positives (600) – Correctly identified road hazards.
                
                This suggests the model is fairly accurate but has some bias toward false positives.`
        },
        "model_performance": {
            title: "Model Performance Metrics",
            image: new URL('../assets/model_performance_metrics.png', import.meta.url).href,
            description: `• 📊 Accuracy (~0.89): The model correctly classifies about 89% of road conditions.
                • 🎯 Precision (~0.78): Of all predicted hazards, about 78% were actual risks.
                • 📢 Recall (~0.86): The model correctly identifies 86% of real road hazards.
                • ⚖ F1-Score (~0.82): Balances precision and recall for a well-rounded performance.`
        },
        "precision_recall": {
            title: "Precision-Recall Curve",
            image: new URL('../assets/precision_recall_curve.png', import.meta.url).href,
            description: `This graph shows the tradeoff between precision and recall at different classification thresholds.
                
                • The model maintains high precision (>0.8) up to 0.8 recall, then declines.
                • Indicates strong performance, except for the last 20% of hazard cases, where precision decreases.`
        },
        "roc_curve": {
            title: "ROC Curve",
            image: new URL('../assets/roc_curve.png', import.meta.url).href,
            description: `📈 AUC (Area Under Curve) = 0.91 – Shows excellent ability to differentiate safe roads from hazardous ones.

                • The curve demonstrates strong performance in balancing true positives against false positives.
                • Significantly outperforms random chance (represented by the diagonal dashed line).`
        },
        "shap": {
            title: "SHAP Feature Importance",
            image: new URL('../assets/shap_feature_importance.png', import.meta.url).href,
            description: `This highlights the most influential factors in road hazard predictions:
                • Traffic density – The most significant factor in predicting road risks.
                • Weather conditions (rain, fog, ice) – Highly impacts road safety.
                • Road infrastructure (potholes, damaged signals) – Affects model predictions.
                • Time of day – Nighttime has a higher risk due to poor visibility.
                
                Understanding these insights helps authorities optimize road safety measures and improve hazard detection.`
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                        Model Analytics & Insights
                    </h1>
                </motion.div>

                <div className="space-y-12">
                    {Object.entries(analyticsData).map(([key, data], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    {data.title}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <motion.img
                                            src={data.image}
                                            alt={data.title}
                                            className="rounded-lg shadow-md w-full h-auto cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-600 whitespace-pre-line">
                                            {data.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conclusion</h2>
                    <p className="text-gray-600">
                    This suggests that high traffic density and poor weather conditions are the biggest predictors of road hazards. 
                    The model performs well overall but is slightly conservative, preferring false positives over missing actual hazards, 
                    ensuring better safety on the roads. 
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Analytics;

