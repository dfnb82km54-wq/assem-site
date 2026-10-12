import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Экрандарды басқаруға арналған state
  const [currentScreen, setCurrentScreen] = useState('login');

  // Форма штаттары
  const [phone, setPhone] = useState('+7 (700) 555 77 55');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('Руслан');
  const [isAgreed, setIsAgreed] = useState(true);
  const [city, setCity] = useState('Алматы');
  const [search, setSearch] = useState('');

  // Каталогтағы өнімдер тізімі
  const productsList = [
    { id: '1', name: 'Увлажняющий крем', price: 4500, emoji: '🧴' },
    { id: '2', name: 'Матовая помада', price: 2800, emoji: '💄' },
    { id: '3', name: 'Тушь для ресниц', price: 3500, emoji: '👁️' },
    { id: '4', name: 'Сыворотка для лица', price: 5200, emoji: '✨' },
  ];

  // Корзиндағы өнімдер тізімі (бастапқыда 2 тауар бар)
  const [cart, setCart] = useState([
    { id: '1', name: 'Увлажняющий крем', price: 4500, emoji: '🧴', quantity: 1 },
    { id: '2', name: 'Матовая помада', price: 2800, emoji: '💄', quantity: 1 },
  ]);

  // Қалалар тізімі
  const citiesList = [
    'Алматы',
    'Астана',
    'Шымкент',
    'Қарағанды',
    'Ақтөбе',
    'Атырау',
    'Қостанай',
    'Павлодар',
    'Өскемен',
  ];

  // Корзинаға тауар қосу / санын арттыру
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Корзиндағы тауар санын азайту
  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0) // Сан 0-ге жетсе тізімнен өшіру
    );
  };

  // Жалпы тауар саны мен бағаны есептеу
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBack = () => {
    setCurrentScreen('login');
  };

  const forgetPassword = () => {
    setCurrentScreen('forgot');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* 1. АВТОРИЗАЦИЯ */}
      {currentScreen === 'login' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Привет, с возвращением!</Text>
          <Text style={styles.subtitle}>Войдите в свой аккаунт.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>📞</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Номер телефона"
              placeholderTextColor="#AAA9B2"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Пароль"
              placeholderTextColor="#AAA9B2"
              secureTextEntry={true}
            />
            <Text style={styles.inputIconText}>👁️</Text>
          </View>

          <Pressable onPress={forgetPassword}>
            <Text style={styles.forgetBtn}>Забыть пароль?</Text>
          </Pressable>

          <Pressable style={styles.loginBtn} onPress={() => setCurrentScreen('city')}>
            <Text style={styles.loginBtnText}>Войти</Text>
          </Pressable>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>У вас нет аккаунта? </Text>
            <Pressable onPress={() => setCurrentScreen('register')}>
              <Text style={styles.linkText}>Зарегистрироваться</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* 2. ВОССТАНОВЛЕНИЕ ПАРОЛЯ */}
      {currentScreen === 'forgot' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={() => setCurrentScreen('login')}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Восстановление пароля</Text>
          <Text style={styles.subtitle}>Введите свой номер телефона, чтобы восстановить пароль</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>📞</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Номер телефона"
              placeholderTextColor="#AAA9B2"
              keyboardType="phone-pad"
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={() => setCurrentScreen('verify')}>
            <Text style={styles.loginBtnText}>Продолжить</Text>
          </Pressable>
        </View>
      )}

      {/* 3. ПОДТВЕРДИТЕ НОМЕР */}
      {currentScreen === 'verify' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={() => setCurrentScreen('forgot')}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Подтвердите номер</Text>
          <Text style={styles.subtitle}>Мы только что отправили код на {phone}</Text>

          <View style={styles.codeContainer}>
            <View style={styles.codeBox}><Text style={styles.codeText}>7</Text></View>
            <View style={styles.codeBox}><Text style={styles.codeText}>8</Text></View>
            <View style={styles.codeBox}><Text style={styles.codeText}>5</Text></View>
            <View style={styles.codeBox}><Text style={styles.codeText}>4</Text></View>
          </View>

          <Pressable style={styles.loginBtn} onPress={() => setCurrentScreen('reset')}>
            <Text style={styles.loginBtnText}>Продолжить</Text>
          </Pressable>
        </View>
      )}

      {/* 4. СБРОС ПАРОЛЯ */}
      {currentScreen === 'reset' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={() => setCurrentScreen('verify')}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Сбросить пароль</Text>
          <Text style={styles.subtitle}>Не менее 8 символов</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Пароль"
              placeholderTextColor="#AAA9B2"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔒</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Повторить пароль"
              placeholderTextColor="#AAA9B2"
              secureTextEntry={true}
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={() => setCurrentScreen('login')}>
            <Text style={styles.loginBtnText}>Продолжить</Text>
          </Pressable>
        </View>
      )}

      {/* 5. РЕГИСТРАЦИЯ */}
      {currentScreen === 'register' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={() => setCurrentScreen('login')}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Регистрация</Text>
          <Text style={styles.subtitle}>Создайте учетную запись, чтобы продолжить!</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>👤</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ваше имя"
              placeholderTextColor="#AAA9B2"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>📞</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Номер телефона"
              placeholderTextColor="#AAA9B2"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔒</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Пароль"
              placeholderTextColor="#AAA9B2"
              secureTextEntry={true}
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={() => setCurrentScreen('city')}>
            <Text style={styles.loginBtnText}>Зарегистрироваться</Text>
          </Pressable>
        </View>
      )}

      {/* 6. ВЫБОР ГОРОДА */}
      {currentScreen === 'city' && (
        <View style={styles.container}>
          <Pressable style={styles.backButton} onPress={() => setCurrentScreen('login')}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.title}>Выберите город</Text>
          <Text style={styles.subtitle}>Заведения будут зависеть от вашего города.</Text>

          <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
            {citiesList.map((item) => {
              const isSelected = city === item;
              return (
                <Pressable
                  key={item}
                  style={[styles.cityCard, isSelected && styles.cityCardActive]}
                  onPress={() => setCity(item)}
                >
                  <Text style={[styles.cityName, isSelected && styles.cityNameActive]}>
                    📍 {item}
                  </Text>
                  {isSelected && <Text style={styles.cityCheck}>✓</Text>}
                </Pressable>
              );
            })}
          </ScrollView>

          <Pressable style={styles.loginBtn} onPress={() => setCurrentScreen('home')}>
            <Text style={styles.loginBtnText}>Продолжить ({city})</Text>
          </Pressable>
        </View>
      )}

      {/* 7. ЭКРАН 1: КАТАЛОГ / ГЛАВНАЯ */}
      {currentScreen === 'home' && (
        <View style={styles.container}>
          <Text style={styles.title}>💄 Бьюти Магазин</Text>
          <Text style={styles.subtitle}>Қала: {city} • Лучшая косметика</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIconText}>🔍</Text>
            <TextInput
              style={styles.input}
              value={search}
              onChangeText={setSearch}
              placeholder="Поиск косметики..."
              placeholderTextColor="#AAA9B2"
            />
          </View>

          <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
            {productsList.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Text style={styles.productEmoji}>{product.emoji}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price} ₸</Text>
                </View>
                <Pressable style={styles.addButton} onPress={() => addToCart(product)}>
                  <Text style={styles.addButtonText}>+</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 8. ЭКРАН 2: КОРЗИНА (Қосу және алу батырмаларымен) */}
      {currentScreen === 'cart' && (
        <View style={styles.container}>
          <Text style={styles.title}>🛒 Корзина</Text>
          <Text style={styles.subtitle}>Ваши выбранные товары</Text>

          <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
            {cart.length === 0 ? (
              пустоТекст()
            ) : (
              cart.map((item) => (
                <View key={item.id} style={styles.productCard}>
                  <Text style={styles.productEmoji}>{item.emoji}</Text>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price * item.quantity} ₸</Text>
                  </View>

                  {/* Санды азайту және көбейту контроллері */}
                  <View style={styles.counterContainer}>
                    <Pressable 
                      style={styles.counterBtn} 
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.counterBtnText}>-</Text>
                    </Pressable>

                    <Text style={styles.counterValue}>{item.quantity}</Text>

                    <Pressable 
                      style={styles.counterBtn} 
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.counterBtnText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}

            {cart.length > 0 && (
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Итого к оплате:</Text>
                <Text style={styles.totalPrice}>{totalPrice} ₸</Text>
              </View>
            )}
          </ScrollView>

          {cart.length > 0 && (
            <Pressable style={styles.loginBtn} onPress={() => alert('Заказ успешно оформлен!')}>
              <Text style={styles.loginBtnText}>Оформить заказ</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* 9. ЭКРАН 3: ПРОФИЛЬ */}
      {currentScreen === 'profile' && (
        <View style={styles.container}>
          <Text style={styles.title}>👤 Профиль</Text>
          <Text style={styles.subtitle}>Личный кабинет покупателя</Text>

          <View style={styles.profileCard}>
            <Text style={styles.profileAvatar}>👩‍🦰</Text>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profilePhone}>{phone}</Text>
            <Text style={styles.profileCity}>Город: {city}</Text>
          </View>

          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>📦 Мои заказы</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => setCurrentScreen('city')}>
            <Text style={styles.menuText}>📍 Изменить город ({city})</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>❤️ Избранное</Text>
          </Pressable>

          <Pressable 
            style={[styles.loginBtn, { backgroundColor: '#FF3B30', marginTop: 10 }]} 
            onPress={() => setCurrentScreen('login')}
          >
            <Text style={styles.loginBtnText}>Выйти из аккаунта</Text>
          </Pressable>
        </View>
      )}

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИЯ */}
      {['home', 'cart', 'profile'].includes(currentScreen) && (
        <View style={styles.tabBar}>
          <Pressable 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.tabIcon}>🏠</Text>
            <Text style={[styles.tabText, currentScreen === 'home' && styles.activeTabText]}>Каталог</Text>
          </Pressable>

          <Pressable 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('cart')}
          >
            <Text style={styles.tabIcon}>🛒</Text>
            <Text style={[styles.tabText, currentScreen === 'cart' && styles.activeTabText]}>
              Корзина {totalCartCount > 0 ? `(${totalCartCount})` : ''}
            </Text>
          </Pressable>

          <Pressable 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('profile')}
          >
            <Text style={styles.tabIcon}>👤</Text>
            <Text style={[styles.tabText, currentScreen === 'profile' && styles.activeTabText]}>Профиль</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

// Корзина бос болған кезде шығатын текст
function пустоТекст() {
  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text style={{ fontSize: 50, marginBottom: 10 }}>🛒</Text>
      <Text style={{ fontSize: 18, color: '#AAA9B2', fontWeight: '600' }}>Ваша корзина пуста</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 32,
    color: '#1B1923',
    fontWeight: '300',
  },
  title: {
    color: '#1B1923',
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 34,
  },
  subtitle: {
    color: '#AAA9B2',
    fontSize: 16,
    marginTop: 3,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  inputIconText: {
    fontSize: 18,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#1B1923',
    fontSize: 16,
  },
  forgetBtn: {
    color: "#A811DA",
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 10,
  },
  loginBtn: {
    marginTop: 10,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A811DA',
    borderRadius: 18,
    marginBottom: 20,
  },
  loginBtnText: {
    fontWeight: '600',
    fontSize: 18,
    color: "#FFFFFF",
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomText: {
    color: '#AAA9B2',
    fontSize: 16,
  },
  linkText: {
    color: '#A811DA',
    fontSize: 16,
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  codeBox: {
    width: 65,
    height: 65,
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1923',
  },
  scrollList: {
    flex: 1,
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cityCardActive: {
    backgroundColor: '#F3E5F5',
    borderColor: '#A811DA',
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1923',
  },
  cityNameActive: {
    color: '#A811DA',
  },
  cityCheck: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A811DA',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  productEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1923',
  },
  productPrice: {
    fontSize: 14,
    color: '#A811DA',
    fontWeight: '600',
    marginTop: 4,
  },
  addButton: {
    width: 36,
    height: 36,
    backgroundColor: '#A811DA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  counterBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#A811DA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 10,
    color: '#1B1923',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8FA',
    padding: 20,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1923',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A811DA',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: 18,
    padding: 24,
    marginBottom: 20,
  },
  profileAvatar: {
    fontSize: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1923',
  },
  profilePhone: {
    fontSize: 14,
    color: '#AAA9B2',
    marginTop: 4,
  },
  profileCity: {
    fontSize: 14,
    color: '#A811DA',
    fontWeight: '600',
    marginTop: 6,
  },
  menuItem: {
    backgroundColor: '#F8F8FA',
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1923',
  },
  tabBar: {
    flexDirection: 'row',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F2',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabText: {
    fontSize: 12,
    color: '#AAA9B2',
    marginTop: 2,
  },
  activeTabText: {
    color: '#A811DA',
    fontWeight: '600',
  },
});