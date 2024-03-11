import { useState } from "react";
import { calculatePE, calculateEnergyRequirement, calculateDailyFoodRequirement } from "../../scripts/calculatorFoodCat";
import cat from '../../img/elements/cat.png';
import catSleep from '../../img/elements/sleep.png';
import catPlaying from '../../img/elements/playing.png';
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
                        Вес кошки:
                        <input className="input--number" type="number" value={weight} onChange={handleWeightChange} min="0" max="30" step="0.5" /> кг
                        {warning && <p className="warning">Введите вес животного</p>}
                    </label>
                </div>
                <div className="container">
                    <div>
                        <span>Уровень активности:</span>
                        <div className="flexed--center">
                            <div onClick={() => handleActivityLevelChange('спокойная')} className={activityLevel === 'спокойная' ? 'active--choise choise' : 'choise'}>
                                <img src={catSleep} alt="Спокойная активность"/>
                                <p>Спокойная</p>
                            </div>
                            <div onClick={() => handleActivityLevelChange('активная')} className={activityLevel === 'активная' ? 'active--choise choise' : 'choise'}>
                                <img src={catPlaying} alt="Активная активность"/>
                                <p>Активная</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <span>Возраст кошки:</span>
                    <div className="flexed--center">
                        <div onClick={() => handleAgeChange('котенок до 6 месяцев')} className={age === 'котенок до 6 месяцев' ? 'active--choise choise' : 'choise'}>
                            <img className="smallCat" src={cat} alt="Котенок до 6 месяцев" />
                            <p>Котенок до 6 месяцев</p>
                        </div>
                        <div onClick={() => handleAgeChange('котенок после 6 месяцев')} className={age === 'котенок после 6 месяцев' ? 'active--choise choise' : 'choise'}>
                            <img className="middleCat" src={cat} alt="Котенок после 6 месяцев" />
                            <p>Котенок после 6 месяцев</p>
                        </div>
                        <div onClick={() => handleAgeChange('взрослая')} className={age === 'взрослая' ? 'active--choise choise' : 'choise'}>
                            <img className="bigCat" src={cat} alt="Взрослая кошка" />
                            <p>Взрослая кошка</p>
                        </div>
                    </div>
                </div>
                
                <button className="btn--submit" type="submit">Рассчитать</button>
            </form>
            {result && (
                <div>
                    <h2>Результаты расчета:</h2>
                    <p>Поддерживающая энергия (ПЕ): <b>{result.pe} ккал/день</b></p>
                    <p>Индивидуальная потребность в энергии: <b>{result.energyRequirement} ккал/день</b></p>
                    <p>Суточная норма корма: <b>{result.dailyFoodRequirement} грамм</b></p>
                </div>
            )}
        </section>
    );
}
 
export default CalculatorFoodCat;