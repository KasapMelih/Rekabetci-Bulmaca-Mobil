import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  // Mock user data
  const user = {
    name: "John Doe",
    username: "johndoe42",
    bio: "Brain game enthusiast. Always looking for a new challenge!",
    joinDate: "March 2023",
    rank: 42,
    level: 18,
    points: 1250,
    achievements: 14,
    friends: 28,
    stats: {
      gamesPlayed: 124,
      gamesWon: 87,
      winRate: "70%",
      averageScore: 840,
      bestGame: "Sudoku",
      longestStreak: 8,
    },
    recentGames: [
      { id: 1, game: "Sudoku", date: "Today", score: 950, result: "win" },
      {
        id: 2,
        game: "Minesweeper",
        date: "Yesterday",
        score: 720,
        result: "win",
      },
      {
        id: 3,
        game: "Tic Tac Toe",
        date: "Yesterday",
        score: 500,
        result: "loss",
      },
      { id: 4, game: "Sudoku", date: "3 days ago", score: 880, result: "win" },
      {
        id: 5,
        game: "Minesweeper",
        date: "4 days ago",
        score: 650,
        result: "loss",
      },
    ],
    achievements: [
      {
        id: 1,
        name: "Sudoku Master",
        description: "Complete 50 Sudoku puzzles",
        icon: "grid",
        progress: 100,
      },
      {
        id: 2,
        name: "Mine Sweeper",
        description: "Clear 30 minefields",
        icon: "bomb",
        progress: 80,
      },
      {
        id: 3,
        name: "Unbeatable",
        description: "Win 20 Tic Tac Toe games in a row",
        icon: "close-box-outline",
        progress: 60,
      },
      {
        id: 4,
        name: "Brain Trainer",
        description: "Play 100 games total",
        icon: "brain",
        progress: 100,
      },
    ],
  };

  // Tabs for profile sections
  const [activeTab, setActiveTab] = useState("stats");

  // Game icon mapping
  const gameIcons = {
    Sudoku: <MaterialCommunityIcons name="grid" size={20} color="#4f46e5" />,
    Minesweeper: <FontAwesome5 name="bomb" size={18} color="#4f46e5" />,
    "Tic Tac Toe": (
      <MaterialCommunityIcons
        name="close-box-outline"
        size={20}
        color="#4f46e5"
      />
    ),
  };

  // Achievement icon mapping
  const achievementIcons = {
    grid: <MaterialCommunityIcons name="grid" size={24} color="white" />,
    bomb: <FontAwesome5 name="bomb" size={22} color="white" />,
    "close-box-outline": (
      <MaterialCommunityIcons
        name="close-box-outline"
        size={24}
        color="white"
      />
    ),
    brain: <FontAwesome5 name="brain" size={22} color="white" />,
  };

  // Result color mapping
  const resultColors = {
    win: "text-green-600",
    loss: "text-red-500",
    draw: "text-amber-500",
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-slate-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">Profile</Text>
          <TouchableOpacity className="ml-auto">
            <Feather name="edit" size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-indigo-600 pt-6 pb-12 px-4">
          <View className="items-center">
            <View className="bg-white w-24 h-24 rounded-full items-center justify-center mb-3 border-4 border-white">
              <Text className="text-indigo-600 text-3xl font-bold">
                {user.name.charAt(0)}
                {user.name.split(" ")[1].charAt(0)}
              </Text>
            </View>
            <Text className="text-white text-xl font-bold">{user.name}</Text>
            <Text className="text-white/80">@{user.username}</Text>

            <View className="bg-white/10 rounded-full px-3 py-1 mt-2">
              <Text className="text-white text-xs">Level {user.level}</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-4 -mt-8">
          <View className="bg-white rounded-xl shadow-md p-4 mb-6">
            <Text className="text-slate-500 text-xs mb-3">{user.bio}</Text>

            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-2xl font-bold text-indigo-600">
                  {user.rank}
                </Text>
                <Text className="text-xs text-slate-500">Rank</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-indigo-600">
                  {user.points}
                </Text>
                <Text className="text-xs text-slate-500">Points</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-indigo-600">
                  {user.stats.gamesPlayed}
                </Text>
                <Text className="text-xs text-slate-500">Games</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-indigo-600">
                  {user.friends}
                </Text>
                <Text className="text-xs text-slate-500">Friends</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4">
          <View className="flex-row bg-slate-200 rounded-lg p-1">
            <Pressable
              className={`flex-1 py-2 rounded-md ${
                activeTab === "stats" ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab("stats")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  activeTab === "stats" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                Stats
              </Text>
            </Pressable>
            <Pressable
              className={`flex-1 py-2 rounded-md ${
                activeTab === "games" ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab("games")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  activeTab === "games" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                Games
              </Text>
            </Pressable>
            <Pressable
              className={`flex-1 py-2 rounded-md ${
                activeTab === "achievements" ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab("achievements")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  activeTab === "achievements"
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Achievements
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Tab Content */}
        <View className="px-4 pb-8">
          {/* Stats Tab */}
          {activeTab === "stats" && (
            <View className="bg-white rounded-xl shadow-md overflow-hidden">
              <View className="p-4 border-b border-slate-100">
                <Text className="text-lg font-bold text-slate-800 mb-4">
                  Game Statistics
                </Text>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-slate-500">Games Played</Text>
                  <Text className="font-medium text-slate-800">
                    {user.stats.gamesPlayed}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-slate-500">Games Won</Text>
                  <Text className="font-medium text-slate-800">
                    {user.stats.gamesWon}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-slate-500">Win Rate</Text>
                  <Text className="font-medium text-slate-800">
                    {user.stats.winRate}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-slate-500">Average Score</Text>
                  <Text className="font-medium text-slate-800">
                    {user.stats.averageScore}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-slate-500">Best Game</Text>
                  <Text className="font-medium text-slate-800">
                    {user.stats.bestGame}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-slate-500">Longest Streak</Text>
                  <Text className="font-medium text-slate-800">
                    {user.stats.longestStreak} days
                  </Text>
                </View>
              </View>

              <View className="p-4">
                <Text className="text-lg font-bold text-slate-800 mb-4">
                  Game Distribution
                </Text>

                {/* Simple bar chart */}
                <View className="mb-3">
                  <View className="flex-row items-center mb-1">
                    <MaterialCommunityIcons
                      name="grid"
                      size={16}
                      color="#4f46e5"
                    />
                    <Text className="ml-2 text-slate-800">Sudoku</Text>
                    <Text className="ml-auto text-xs text-slate-500">
                      58 games
                    </Text>
                  </View>
                  <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "58%" }}
                    />
                  </View>
                </View>

                <View className="mb-3">
                  <View className="flex-row items-center mb-1">
                    <FontAwesome5 name="bomb" size={14} color="#4f46e5" />
                    <Text className="ml-2 text-slate-800">Minesweeper</Text>
                    <Text className="ml-auto text-xs text-slate-500">
                      42 games
                    </Text>
                  </View>
                  <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "42%" }}
                    />
                  </View>
                </View>

                <View>
                  <View className="flex-row items-center mb-1">
                    <MaterialCommunityIcons
                      name="close-box-outline"
                      size={16}
                      color="#4f46e5"
                    />
                    <Text className="ml-2 text-slate-800">Tic Tac Toe</Text>
                    <Text className="ml-auto text-xs text-slate-500">
                      24 games
                    </Text>
                  </View>
                  <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "24%" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Games Tab */}
          {activeTab === "games" && (
            <View className="bg-white rounded-xl shadow-md overflow-hidden">
              <View className="p-4 border-b border-slate-100">
                <Text className="text-lg font-bold text-slate-800">
                  Recent Games
                </Text>
              </View>

              {user.recentGames.map((game, index) => (
                <View
                  key={game.id}
                  className={`p-4 flex-row items-center ${
                    index < user.recentGames.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <View className="bg-indigo-100 p-2 rounded-full mr-3">
                    {gameIcons[game.game]}
                  </View>

                  <View className="flex-1">
                    <Text className="font-medium text-slate-800">
                      {game.game}
                    </Text>
                    <Text className="text-xs text-slate-500">{game.date}</Text>
                  </View>

                  <View className="items-end">
                    <Text className="font-medium text-slate-800">
                      {game.score}
                    </Text>
                    <Text className={`text-xs ${resultColors[game.result]}`}>
                      {game.result.charAt(0).toUpperCase() +
                        game.result.slice(1)}
                    </Text>
                  </View>
                </View>
              ))}

              <TouchableOpacity className="p-4 border-t border-slate-100">
                <Text className="text-center text-indigo-600 font-medium">
                  View All Games
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <View className="bg-white rounded-xl shadow-md overflow-hidden">
              <View className="p-4 border-b border-slate-100">
                <Text className="text-lg font-bold text-slate-800">
                  Achievements
                </Text>
                <Text className="text-sm text-slate-500">
                  {user.achievements.length} of 20 achievements unlocked
                </Text>
              </View>

              {user.achievements.map((achievement, index) => (
                <View
                  key={achievement.id}
                  className={`p-4 ${
                    index < user.achievements.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`
                      w-10 h-10 rounded-full items-center justify-center mr-3
                      ${
                        achievement.progress === 100
                          ? "bg-indigo-600"
                          : "bg-slate-300"
                      }
                    `}
                    >
                      {achievementIcons[achievement.icon]}
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text className="font-medium text-slate-800">
                          {achievement.name}
                        </Text>
                        {achievement.progress === 100 && (
                          <View className="ml-2 bg-green-100 px-2 py-0.5 rounded-full">
                            <Text className="text-xs text-green-700">
                              Completed
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-xs text-slate-500">
                        {achievement.description}
                      </Text>
                    </View>
                  </View>

                  {achievement.progress < 100 && (
                    <View className="mt-2">
                      <View className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </View>
                      <Text className="text-xs text-slate-500 mt-1">
                        {achievement.progress}% complete
                      </Text>
                    </View>
                  )}
                </View>
              ))}

              <TouchableOpacity className="p-4 border-t border-slate-100">
                <Text className="text-center text-indigo-600 font-medium">
                  View All Achievements
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-slate-200 px-4 py-2">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="home-outline" size={24} color="#64748b" />
            <Text className="text-xs text-slate-500">Home</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="trophy-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Compete</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="stats-chart-outline" size={24} color="#64748b" />
          <Text className="text-xs text-slate-500">Stats</Text>
        </TouchableOpacity>
        <Link href="/settings" asChild>
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="settings-outline" size={24} color="#64748b" />
            <Text className="text-xs text-slate-500">Settings</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
