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
    this.NumTst = new RegExp(/^#/g)
  }

  private methodText() {
    if(this.methodName === "hello world = 1"){
    }
    else const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
  }
}

for (let i = 0; i < arr.length; i++) {
  console.log(i - 1 + 2 / 4 * 1254 > 10 < 22 % 52 | 44)
  i--
  j /= 4
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
  console.log('ok', "152 dfdf")
  method.call(vv, 1000)
}
catch(Exception e) {

}`},
go: {
  code: `package animals

import "fmt"

func sum(s []int, c chan int) {
  sum := 0
  for _, v := range s {
    sum += v
  }
  c <- sum // send sum to c
}

func main() {
  s := []int{7, 2, 8, -9, 4, 0}

  c := make(chan int)
  go sum(s[:len(s)/2], c)
  go sum(s[len(s)/2:], c)
  x, y := <-c, <-c // receive from c

  fmt.Println(x, y, x+y)
}

func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(true ? 1 : 0)
}`},
rust: {
  code: `//declare a structure
struct Employee {
    name:String,
    company:String,
    age:u32
}
fn main() {
    //initialize a structure
    let emp1 = Employee {
      company:String::from("TutorialsPoint"),
      name:String::from("Mohtashim"),
      age:50
    };
    let emp2 = Employee{
      company:String::from("TutorialsPoint"),
      name:String::from("Kannan"),
      age:32
    };
    //pass emp1 and emp2 to display()
    display(emp1);
    display(emp2);
}
// fetch values of specific structure fields using the 
// operator and print it to the console
fn display( emp:Employee){
    println!("Name is :{} company is {} age is 
    {}",emp.name,emp.company,emp.age);
}`},
  python: {
    code: `# Return the sum of
'''Statistical median to demonstrate doctest.
  >>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])
  7
'''
def squaresum(n) : # comment
  
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
  java: {
    code: `import java.awt.event.ActionEvent;
import java.awt.event.ActionListener; 
/* 
  Comment here in class Node return
  <Object, Long>
  nodes.add(nodeA);
*/
public class Graph { /* Commnet */

  static Node node; // another comment
  protected String str = "hello Java";
  private Set<Node> nodes = new HashSet<Object, Long>();
  
  public void addNode(Node nodeA) {
      nodes.add(nodeA);
  }

  // getters and setters 
}`},
  csharp: {
    code: `using System;
// Create a Car class
class Car
{
  public string model;  // Create a field

  // Create a class constructor for the Car class
  public Car()
  {
    model = "Mustang"; // Set the initial value for model
  }

  static void Main(string[] args)
  {
    Car Ford = new Car();  // Create an object of the Car Class (this will call the constructor)
    Console.WriteLine(Ford.model);  // Print the value of model
  }
}

// Outputs "Mustang"`},
cpp: {
  code: `#include <iostream>
using namespace std;

class Employee {
  private:
    // Private attribute
    int salary;

  public:
    // Setter
    void setSalary(int s) {
      salary = s;
    }
    // Getter
    int getSalary() {
      return salary;
    }
};

int main() {
  Employee myObj;
  myObj.setSalary(50000);
  cout << myObj.getSalary();
  return 0;
}`},
  php: {
    code: `<?php
class Fruit {
  // Properties
  public $name = " color $po" . "tester <br/>";
  public $color = 1235;

  // Methods
  function set_name($name) {
    $this->name = $name;
  }
  function get_name() {
    return $this->name;
  }
}
?>`},
sql: {
  code: `-- Select all:
SELECT * FROM Customers;
SELECT column_name(s)
FROM table1 -- comment
RIGHT JOIN table2
ON table1.column_name = table2.column_name
WHERE column_name BETWEEN value1 AND value2;

CREATE TABLE Persons ( /* comment */
  ID int NOT NULL UNIQUE,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int
);
/*
  comment
*/
delete from persons
update persons set name= 'hello'

EXCEPTION 
   Exception-handling-statements 
END;`}
}