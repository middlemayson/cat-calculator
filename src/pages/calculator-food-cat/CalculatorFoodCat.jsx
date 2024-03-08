import { useState } from "react";
import { calculatePE, calculateEnergyRequirement, calculateDailyFoodRequirement } from "../../scripts/calculatorFoodCat";
import polos from '../../img/polos.jpg';
import black from '../../img/black.jpg';
import '../../styles/main.css';

const CalculatorFoodCat = () => {

    const [weight, setWeight] = useState(0);
    const [activityLevel, setActivityLevel] = useState('спокойная');
    const [age, setAge] = useState('взрослая');
    const [result, setResult] = useState(null);
    const [warning, setWarning] = useState(false);

    const handleWeightChange = (event) => {
        const newWeight = parseFloat(event.target.value);
        setWeight(newWeight);
        if (newWeight === 0) {
            setWarning(true);
        } else {
            setWarning(false);
        }
    };

    const handleActivityLevelChange = (level) => {
        setActivityLevel(level);
    };

    const handleAgeChange = (value) => {
        setAge(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (weight === 0) {
            setWarning(true);
            return;
        }
        const pe = calculatePE(weight);
        const energyRequirement = calculateEnergyRequirement(pe, activityLevel, age);
        const dailyFoodRequirement = calculateDailyFoodRequirement(energyRequirement, 3.5); // 3.5 ккал/грамм
        setResult({
            pe: pe.toFixed(2),
            energyRequirement: energyRequirement.toFixed(2),
            dailyFoodRequirement: dailyFoodRequirement.toFixed(2)
        });
    };

    return (
        <section className="calculator">
            <form onSubmit={handleSubmit}>
                <h1>Расчет суточной нормы для кошек</h1>
                <div className="container">
                    <label>
                        Вес кошки (кг):
                        <input className="input--number" type="number" value={weight} onChange={handleWeightChange} min="0" max="30" />
                        {warning && <p style={{ color: 'red' }}>Введите вес животного</p>}
                    </label>
                </div>
                <div className="container">
                    <div>
                        <span>Уровень активности:</span>
                        <div className="flexed--center">
                            <div onClick={() => handleActivityLevelChange('спокойная')} className={activityLevel === 'спокойная' ? 'active--choise choise' : 'choise'}>
                                <img src={black} alt="Спокойная активность"/>
                                <p>Спокойная</p>
                            </div>
                            <div onClick={() => handleActivityLevelChange('активная')} className={activityLevel === 'активная' ? 'active--choise choise' : 'choise'}>
                                <img src={polos} alt="Активная активность"/>
                                <p>Активная</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <span>Возраст кошки:</span>
                    <div className="flexed--center">
                        <div onClick={() => handleAgeChange('котенок до 6 месяцев')} className={age === 'котенок до 6 месяцев' ? 'active--choise choise' : 'choise'}>
                            <img src="/path/to/kitten1.png" alt="Котенок до 6 месяцев" />
                            <p>Котенок до 6 месяцев</p>
                        </div>
                        <div onClick={() => handleAgeChange('котенок после 6 месяцев')} className={age === 'котенок после 6 месяцев' ? 'active--choise choise' : 'choise'}>
                            <img src="/path/to/kitten2.png" alt="Котенок после 6 месяцев" />
                            <p>Котенок после 6 месяцев</p>
                        </div>
                        <div onClick={() => handleAgeChange('взрослая')} className={age === 'взрослая' ? 'active--choise choise' : 'choise'}>
                            <img src="/path/to/adult.png" alt="Взрослая кошка" />
                            <p>Взрослая</p>
                        </div>
                    </div>
                </div>
                
                <button className="btn--submit" type="submit">Рассчитать</button>
            </form>
            {result && (
                <div>
                    <h2>Результаты расчета:</h2>
                    <p>Поддерживающая энергия (ПЕ): {result.pe} ккал/день</p>
                    <p>Индивидуальная потребность в энергии: {result.energyRequirement} ккал/день</p>
                    <p>Суточная норма корма: {result.dailyFoodRequirement} грамм</p>
                </div>
            )}
        </section>
    );
}
 
export default CalculatorFoodCat;