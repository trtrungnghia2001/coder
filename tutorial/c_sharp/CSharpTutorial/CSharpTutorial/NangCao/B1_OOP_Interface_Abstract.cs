


public class Vehicle
{
    public virtual void Start()
    {
        Console.WriteLine("Vehicle Start");
    }
}

public class Car: Vehicle
{
    public override void Start()
    {
        Console.WriteLine("Car Start");
    }
}

public class Motorbike : Vehicle
{
    public override void Start()
    {
        Console.WriteLine("Motorbike Start");
    }
}

public interface ICanFly
{
    void Fly();
}

public class Plane: Vehicle, ICanFly
{
    public override void Start()
    {
        Console.WriteLine("Plane Start");
    }
    public void Fly()
    {
        Console.WriteLine("Plane Fly");
    }
}

public class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal speak");
    }
}

public class Cat: Animal
{
    public override void Speak()
    {
        Console.WriteLine("Cat speak");
    }

}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Dog speak");
    }

}

public interface ICanSwim
{
    void Swim();
}
public class Fish : Animal, ICanSwim
{
    public override void Speak()
    {
        Console.WriteLine("Fish speak");
    }

    public void Swim() {
        Console.WriteLine("Fish Swim");
    }

}

class B1_OOP_Interface_Abstract
{
    public static void Main()
    {
        Vehicle vehicle = new Vehicle();
        vehicle.Start();

        Car car = new Car();
        car.Start();

        Motorbike motorbike = new Motorbike();
        motorbike.Start();

        Plane plane = new Plane();
        plane.Start();
        plane.Fly();


        List<Animal> animals = new List<Animal>()
        {
            new Cat(),
            new Cat(),
            new Dog(),
            new Fish()
        };

        foreach (var item in animals)
        {
            item.Speak();
            if(item is Fish fish)
            {
                fish.Swim();
            }
        }

    }
}