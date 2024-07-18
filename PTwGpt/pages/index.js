import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState("Male");
  const [aim, setAim] = useState("Gain Muscle");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, age: age, gender: gender, aim: aim }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result.replaceAll("\n", "<br />"));
    } catch (error) {
      // 
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Workout Plan maker</title>
        <link rel="icon" href="/work.png" />
      </Head>
      <main className={styles.main}>
        <h3>Personal Trainer</h3>
        <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Your Age "
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />
          
          <label>Gender</label>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="Child"
              checked={gender === "Child"}
              onChange={(e) => setGender(e.target.value)}
            />
            Cocuk
          </label>
          
          <label>What Do You Want</label>
          <select
            value={aim}
            onChange={(e) => {
              setAim(e.target.value);
            }}
          >
            <option value="Gain Muscles">Gain Muscles</option>
            <option value="Reduce Weight">Reduce Weight</option>
            <option value="Stabilize your Weights">Stabilize Your Weights</option>
            <option value="Stay Fit">Stay Fit</option>
          </select>
          <input type="submit" value="Create a Plan" />
        </form>
        {loading && (
          <div>
            <h4>Please Wait While We are Creating a Beatiful Plan for You... </h4>
          </div>
        )}
        {result && (
          <div>
            <div
              className={styles.result}
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
