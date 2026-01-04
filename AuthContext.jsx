import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user từ localStorage khi mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('phoneStoreUser')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Đăng ký
  const register = (userData) => {
    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem('phoneStoreUsers') || '[]')
    
    // Kiểm tra email đã tồn tại
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email đã được sử dụng')
    }

    // Thêm user mới
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // Trong thực tế phải hash password
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem('phoneStoreUsers', JSON.stringify(users))

    // Auto login sau khi đăng ký
    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword. password
    setUser(userWithoutPassword)
    localStorage.setItem('phoneStoreUser', JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  }

  // Đăng nhập
  const login = (email, password) => {
    const users = JSON.parse(localStorage. getItem('phoneStoreUsers') || '[]')
    
    const user = users.find(u => u.email === email && u. password === password)
    
    if (! user) {
      throw new Error('Email hoặc mật khẩu không đúng')
    }

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password
    
    setUser(userWithoutPassword)
    localStorage.setItem('phoneStoreUser', JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  }

  // Đăng xuất
  const logout = () => {
    setUser(null)
    localStorage.removeItem('phoneStoreUser')
  }

  // Cập nhật thông tin user
  const updateUser = (updates) => {
    const updatedUser = { ...user, ... updates }
    setUser(updatedUser)
    localStorage.setItem('phoneStoreUser', JSON.stringify(updatedUser))

    // Cập nhật trong danh sách users
    const users = JSON.parse(localStorage. getItem('phoneStoreUsers') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem('phoneStoreUsers', JSON.stringify(users))
    }
  }

  const value = {
    user,
    loading,
    register,
login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
