const langsTest = {
  javascript: {
    code: `// hello world
/*
this is a multi comments
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

}`},
  python: {
    code: `# Return the sum of
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
  
# This code is contributed by Nikita Tiwari.`},
  perl: {
    code: `#!/usr/bin/perl

use strict;
use warnings;

# first, create your message

use Email::MIME;

my $message = Email::MIME->create(

  header_str => [

    From    => 'you@example.com',

    To      => 'friend@example.com',

    Subject => 'Happy birthday!',

  ],

for( $a = 10; $a < 20; $a = $a + 1 ) {
  print "value of a: $a\n";
}

package Person;
sub new {
    my $class = shift;
    my $self = {
      _firstName => shift,
      _lastName  => shift,
      _ssn       => shift,
    };
    # Print all the values just for clarification.
    print "First Name is $self->{_firstName}\n";
    print "Last Name is $self->{_lastName}\n";
    print "SSN is $self->{_ssn}\n";
    bless $self, $class;
    return $self;
}`},
  java: {
    code: `import java.awt.event.ActionEvent;
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
}`},
  csharp: {
    code: `using System;
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
}`},
  php: {
    code: `<?php
class Fruit {
  // Properties
  public $name;
  public $color;

  // Methods
  function set_name($name) {
    $this->name = $name;
  }
  function get_name() {
    return $this->name;
  }
}
?>`}
}