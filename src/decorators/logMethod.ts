export default function LogMethod(_target: any, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = propertyDesciptor.value;
  propertyDesciptor.value = function (...args: any[]) {
    console.log(`${propertyName} metódus hívva az argumentumokkal: ${JSON.stringify(args)}`);
    return originalMethod.apply(this, args);
  };
  return propertyDesciptor;
}