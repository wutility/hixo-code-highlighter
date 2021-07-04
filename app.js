let jsCode = `// hello world
/*
  multi comments
*/
class Test {
  constructor() {

  }

  private methodText() {
    this.methodName = 'hello world = 1'
  }
}
object
  .getHighlighter({
    theme: 'nord'
  })
  .then(highlighter => {
    const code = highlighter.codeToHtml("console.log('just');", 'js')
    let str = ' console.log(" another");'
    let textName = 'console.log(" another");'
    document.getElementById('output').innerHTML = code
    return 1
  })
  
  for (let i = 0; i < arr.length; i++) {
    console.log(i - 1)
    let v << undefined
    let k >> null
  }
  
  try {

  }
  catch(Exception e) {

  }`;

let javaCode = `import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener; 
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class Calculatrice extends JFrame {
  private JPanel container = new JPanel();
  //Tableau stockant les éléments à afficher dans la calculatrice
  String[] tab_string = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "=", "C", "+", "-", "*", "/"};
  //Un bouton par élément à afficher
  JButton[] tab_button = new JButton[tab_string.length];
  private JLabel ecran = new JLabel();
  private Dimension dim = new Dimension(50, 40);
  private Dimension dim2 = new Dimension(50, 31);
  private double chiffre1;
  private boolean clicOperateur = false, update = false;
  private String operateur = "";

  public Calculatrice(){
    this.setSize(240, 260);
    this.setTitle("Calculette");
    this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    this.setLocationRelativeTo(null);
    this.setResizable(false);
    //On initialise le conteneur avec tous les composants
      initComposant();
      //On ajoute le conteneur
    this.setContentPane(container);
    this.setVisible(true);
  }

  private void initComposant(){
    //On définit la police d'écriture à utiliser
    Font police = new Font("Arial", Font.BOLD, 20);
    ecran = new JLabel("0");
    ecran.setFont(police);
    //On aligne les informations à droite dans le JLabel
    ecran.setHorizontalAlignment(JLabel.RIGHT);
    ecran.setPreferredSize(new Dimension(220, 20));
    JPanel operateur = new JPanel();      
    operateur.setPreferredSize(new Dimension(55, 225));
    JPanel chiffre = new JPanel();
    chiffre.setPreferredSize(new Dimension(165, 225));
    JPanel panEcran = new JPanel();
    panEcran.setPreferredSize(new Dimension(220, 30));

    //On parcourt le tableau initialisé
    //afin de créer nos boutons
    for(int i = 0; i < tab_string.length; i++){
      tab_button[i] = new JButton(tab_string[i]);
      tab_button[i].setPreferredSize(dim);
      switch(i){
        //Pour chaque élément situé à la fin du tableau
        //et qui n'est pas un chiffre
        //on définit le comportement à avoir grâce à un listener
        case 11 :
          tab_button[i].addActionListener(new EgalListener());
          chiffre.add(tab_button[i]);
          break;
        case 12 :
          tab_button[i].setForeground(Color.red);
          tab_button[i].addActionListener(new ResetListener());
          operateur.add(tab_button[i]);
          break;
        case 13 :
          tab_button[i].addActionListener(new PlusListener());
          tab_button[i].setPreferredSize(dim2);
          operateur.add(tab_button[i]);
          break;
        case 14 :
          tab_button[i].addActionListener(new MoinsListener());
          tab_button[i].setPreferredSize(dim2);
          operateur.add(tab_button[i]);
          break;    
        case 15 :   
          tab_button[i].addActionListener(new MultiListener());
          tab_button[i].setPreferredSize(dim2);
          operateur.add(tab_button[i]);
          break;
        case 16 :
          tab_button[i].addActionListener(new DivListener());
          tab_button[i].setPreferredSize(dim2);
          operateur.add(tab_button[i]);
          break;
        default :
          //Par défaut, ce sont les premiers éléments du tableau
          //donc des chiffres, on affecte alors le bon listener
          chiffre.add(tab_button[i]);
          tab_button[i].addActionListener(new ChiffreListener());
          break;
      }
    }
    panEcran.add(ecran);
    panEcran.setBorder(BorderFactory.createLineBorder(Color.black));
    container.add(panEcran, BorderLayout.NORTH);
    container.add(chiffre, BorderLayout.CENTER);
    container.add(operateur, BorderLayout.EAST);
  }

  //Méthode permettant d'effectuer un calcul selon l'opérateur sélectionné
  private void calcul(){
    if(operateur.equals("+")){
      chiffre1 = chiffre1 + 
            Double.valueOf(ecran.getText()).doubleValue();
      ecran.setText(String.valueOf(chiffre1));
    }
    if(operateur.equals("-")){
      chiffre1 = chiffre1 - 
            Double.valueOf(ecran.getText()).doubleValue();
      ecran.setText(String.valueOf(chiffre1));
    }          
    if(operateur.equals("*")){
      chiffre1 = chiffre1 * 
            Double.valueOf(ecran.getText()).doubleValue();
      ecran.setText(String.valueOf(chiffre1));
    }     
    if(operateur.equals("/")){
      try{
        chiffre1 = chiffre1 / 
              Double.valueOf(ecran.getText()).doubleValue();
        ecran.setText(String.valueOf(chiffre1));
      } catch(ArithmeticException e) {
        ecran.setText("0");
      }
    }
  }

  //Listener utilisé pour les chiffres
  //Permet de stocker les chiffres et de les afficher
  class ChiffreListener implements ActionListener {
    public void actionPerformed(ActionEvent e){
      //On affiche le chiffre additionnel dans le label
      String str = ((JButton)e.getSource()).getText();
      if(update){
        update = false;
      }
      else{
        if(!ecran.getText().equals("0"))
          str = ecran.getText() + str;
      }
      ecran.setText(str);
    }
  }

  //Listener affecté au bouton =
  class EgalListener implements ActionListener {
    public void actionPerformed(ActionEvent arg0){
      calcul();
      update = true;
      clicOperateur = false;
    }
  }

  //Listener affecté au bouton +
  class PlusListener implements ActionListener {
    public void actionPerformed(ActionEvent arg0){
      if(clicOperateur){
        calcul();
        ecran.setText(String.valueOf(chiffre1));
      }
      else{
        chiffre1 = Double.valueOf(ecran.getText()).doubleValue();
        clicOperateur = true;
      }
      operateur = "+";
      update = true;
    }
  }

  //Listener affecté au bouton -
  class MoinsListener implements ActionListener {
    public void actionPerformed(ActionEvent arg0){
      if(clicOperateur){
        calcul();
        ecran.setText(String.valueOf(chiffre1));
      }
      else{
        chiffre1 = Double.valueOf(ecran.getText()).doubleValue();
        clicOperateur = true;
      }
      operateur = "-";
      update = true;
    }
  }

  //Listener affecté au bouton *
  class MultiListener implements ActionListener {
    public void actionPerformed(ActionEvent arg0){
      if(clicOperateur){
        calcul();
        ecran.setText(String.valueOf(chiffre1));
      }
      else{
        chiffre1 = Double.valueOf(ecran.getText()).doubleValue();
        clicOperateur = true;
      }
      operateur = "*";
      update = true;
    }
  }

  //Listener affecté au bouton /
  class DivListener implements ActionListener {
    public void actionPerformed(ActionEvent arg0){
      if(clicOperateur){
        calcul();
        ecran.setText(String.valueOf(chiffre1));
      }
      else{
        chiffre1 = Double.valueOf(ecran.getText()).doubleValue();
        clicOperateur = true;
      }
      operateur = "/";
      update = true;
    }
  }

  //Listener affecté au bouton de remise à zéro
  class ResetListener implements ActionListener {
    public void actionPerformed(ActionEvent arg0){
      clicOperateur = false;
      update = true;
      chiffre1 = 0;
      operateur = "";
      ecran.setText("");
    }
  }      
}`;

let csharpCode = `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonInsertion_Sort
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] numbers = new int[10] {2, 5, -4, 11, 0, 18, 22, 67, 51, 6};
            Console.WriteLine("\nOriginal Array Elements :");
			PrintIntegerArray(numbers);
            Console.WriteLine("\nSorted Array Elements :");
            PrintIntegerArray(InsertionSort(numbers));
			Console.WriteLine("\n");
            }

        static int[] InsertionSort(int[] inputArray)
        {
            for (int i = 0; i < inputArray.Length - 1; i++)
            {
                for (int j = i + 1; j > 0; j--)
                {
                    if (inputArray[j - 1] > inputArray[j])
                    {
                        int temp = inputArray[j - 1];
                        inputArray[j - 1] = inputArray[j];
                        inputArray[j] = temp;
                    }
                  }
            }
            return inputArray;         
        }
        public static void PrintIntegerArray(int[] array)
        {
            foreach (int i in array)
            {
                Console.Write(i.ToString() + "  ");
            }
         }

       
        public static int[] InsertionSortByShift(int[] inputArray)
        {
            for (int i = 0; i < inputArray.Length - 1; i++)
            {
                int j;
                var insertionValue = inputArray[i];
                for (j = i; j > 0; j--)
                {
                    if (inputArray[j - 1] > insertionValue)
                    {
                        inputArray[j] = inputArray[j - 1];
                    }
                }
                inputArray[j] = insertionValue;
            }
            return inputArray;
        }

     }
}`;

const langs = { javascript: jsCode, java: javaCode, csharp: csharpCode };

const txtArea = document.getElementById('txtcode')
const codeDisplay = document.querySelector('code')

let hixo = new Hixo();

txtArea.textContent = jsCode
codeDisplay.innerHTML = hixo.render(jsCode)

txtArea.addEventListener('change', e => {
  codeDisplay.innerHTML = hixo.render(e.target.value)
})

document.getElementById('language').addEventListener('change', e => {
  codeDisplay.innerHTML = hixo.render(langs[e.target.value])
});
