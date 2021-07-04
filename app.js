let jsCode = `// hello world
/*
  multi comments
*/
class Test {
  constructor() {
    this.timeV += false
    this.timeV *= /^#/g
  }

  private methodText() {
    this.methodName = 'hello world = 1'
  }
}

  for (let i = 0; i < arr.length; i++) {
    console.log(i - 1 + 2 / 4 * 1254 > 10 < 22 % 52 | 44)
    let v << undefined
    let k >> null
    return 'hello'
  }
  // try catch block
  try {
    while(true) {
      continue
      break
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

let pythonCode = `# Return the sum of
'''Statistical median to demonstrate doctest.
  >>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])
  7
'''
def squaresum(n) :
  
    # Iterate i from 1 
    # and n finding 
    # square of i and
    # add to sum.
    sm = 0
    for i in range(1, n+1) :
        sm = sm + (i * i)
      
    return sm
  
# Driven Program
n = 4
print(squaresum(n))
  
# This code is contributed by Nikita Tiwari.`

const langs = { javascript: jsCode, java: javaCode, csharp: csharpCode, python: pythonCode };

const txtArea = document.getElementById('txtcode')
const codeDisplay = document.querySelector('code')

let hixo = new Hixo();

txtArea.value = jsCode
codeDisplay.innerHTML = hixo.codeToHtml(jsCode)

txtArea.addEventListener('change', e => {
  codeDisplay.innerHTML = hixo.codeToHtml(e.target.value)
})

document.getElementById('language').addEventListener('change', e => {
  let selectLang = langs[e.target.value]
  txtArea.value = selectLang
  codeDisplay.innerHTML = hixo.codeToHtml(selectLang)
});
