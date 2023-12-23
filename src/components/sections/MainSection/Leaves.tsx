import Leaf04 from "@app/assets/leaves/leaf-04.png";
import Leaf05 from "@app/assets/leaves/leaf-05.png";
import Leaf03 from "@app/assets/leaves/leaf-03.png";
import styles from "./MainSection.module.scss";
import Flower01 from "@app/assets/leaves/flower-01.png";

export default function Leaves() {
  return <>
    <img src={Leaf04.src} className={styles.leaf04}/>
    <img src={Leaf05.src} className={styles.leaf05}/>
    <img src={Flower01.src} className={styles.flower}/>
  </>
}
