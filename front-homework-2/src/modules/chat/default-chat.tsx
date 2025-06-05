export const DefaultChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Добро пожаловать в чат
        </h2>
        <p className="text-gray-600 mb-6">
          Выберите чат из списка слева или создайте новый, чтобы начать общение 
        </p>
      </div>
    </div>
  );
}; 