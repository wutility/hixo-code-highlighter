let jsCode = `// hello world
/*
  multi comments
*/
class Test {
  constructor() {
    this.timeV = false
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
  // try catch block
  try {
    while(true) {
      continue
    }

    method.call(vv,ff)
  }
  catch(Exception e) {

  }`;

let javaCode = `import java.awt.event.ActionEvent;
import java.awt.event.ActionListener; 
/* 
  Comment here in class Node return
  <Object, Long>
  nodes.add(nodeA);
*/
public class Graph {

  private Node node;

  private Set<Node> nodes = new HashSet<Object, Long>();
  
  public void addNode(Node nodeA) {
      nodes.add(nodeA);
  }

  // getters and setters 
}`;

let csharpCode = `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommonInsertion_Sort
{
    class Program<Object, Long>
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

txtArea.textContent = javaCode
codeDisplay.innerHTML = hixo.codeToHtml(javaCode)

txtArea.addEventListener('change', e => {
  codeDisplay.innerHTML = hixo.codeToHtml(e.target.value)
})

document.getElementById('language').addEventListener('change', e => {
  codeDisplay.innerHTML = hixo.codeToHtml(langs[e.target.value])
});
