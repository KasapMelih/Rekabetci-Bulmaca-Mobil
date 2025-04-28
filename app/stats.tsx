import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  Octicons,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

// Mock data for charts
const weeklyActivity = [65, 40, 78, 95, 50, 75, 85];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Stats() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;

  // Selected time period for stats
  const [timePeriod, setTimePeriod] = useState("week");

  // Selected game filter
  const [gameFilter, setGameFilter] = useState("all");

  // Mock statistics data
  const stats = {
    summary: {
      gamesPlayed: 124,
      gamesWon: 87,
      totalPoints: 12450,
      averageScore: 840,
      timeSpent: "32h 15m",
      winRate: 70,
    },
    games: {
      sudoku: {
        played: 58,
        won: 45,
        winRate: 78,
        averageScore: 920,
        bestScore: 1250,
        totalTime: "15h 20m",
      },
      minesweeper: {
        played: 42,
        won: 28,
        winRate: 67,
        averageScore: 780,
        bestScore: 1100,
        totalTime: "10h 45m",
      },
      tictactoe: {
        played: 24,
        won: 14,
        winRate: 58,
        averageScore: 650,
        bestScore: 850,
        totalTime: "6h 10m",
      },
    },
    rankings: {
      global: 1250,
      country: 42,
      friends: 3,
    },
    achievements: {
      unlocked: 14,
      total: 25,
      recent: [
        { name: "Sudoku Master", date: "2 days ago" },
        { name: "Quick Thinker", date: "5 days ago" },
        { name: "Weekly Champion", date: "1 week ago" },
      ],
    },
    streaks: {
      current: 5,
      longest: 14,
      thisMonth: 22,
    },
    recentScores: [
      { game: "Sudoku", score: 950, date: "Today" },
      { game: "Minesweeper", score: 720, date: "Yesterday" },
      { game: "Sudoku", score: 880, date: "3 days ago" },
      { game: "Tic Tac Toe", score: 500, date: "3 days ago" },
      { game: "Minesweeper", score: 650, date: "4 days ago" },
    ],
  };

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

  // Simple bar chart component
  const BarChart = ({ data, labels, height = 150 }) => {
    const maxValue = Math.max(...data);

    return (
      <View className="mt-2">
        <View className="flex-row justify-between h-[150px]">
          {data.map((value, index) => (
            <View key={index} className="items-center flex-1">
              <View className="flex-1 justify-end w-full px-1">
                <View
                  className="bg-indigo-500 rounded-t-md w-full"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                />
              </View>
              <Text className="text-xs text-slate-500 mt-1">
                {labels[index]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Circular progress component
  const CircularProgress = ({
    percentage,
    size = 80,
    strokeWidth = 10,
    color = "#4f46e5",
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View
        style={{ width: size, height: size }}
        className="items-center justify-center"
      >
        <Svg width={size} height={size}>
          <Circle
            stroke="#e2e8f0"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={color}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <Text className="absolute text-lg font-bold text-slate-800">
          {percentage}%
        </Text>
      </View>
    );
  };

  // For the circular progress component, we need to import SVG components
  // Since we can't actually use react-native-svg in this code example, let's create a simpler version
  // In a real app, you would use react-native-svg
  const Svg = ({ width, height, children }) => (
    <View style={{ width, height, position: "relative" }}>{children}</View>
  );

  const Circle = ({
    cx,
    cy,
    r,
    stroke,
    strokeWidth,
    fill,
    strokeDasharray,
    strokeDashoffset,
    strokeLinecap,
  }) => {
    // This is a placeholder. In a real app, you would use the Circle component from react-native-svg
    return (
      <View
        style={{
          width: r * 2,
          height: r * 2,
          borderRadius: r,
          borderWidth: strokeWidth,
          borderColor: stroke,
          position: "absolute",
          top: cy - r,
          left: cx - r,
        }}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-slate-200">
        <View className="flex-row items-center">
          <Text className="text-xl font-bold text-slate-800">Statistics</Text>
          <TouchableOpacity className="ml-auto">
            <Feather name="share" size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Time Period Selector */}
        <View className="px-4 py-4">
          <View className="flex-row bg-white rounded-lg shadow-sm p-1">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                timePeriod === "week" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setTimePeriod("week")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  timePeriod === "week" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                timePeriod === "month" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setTimePeriod("month")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  timePeriod === "month" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                timePeriod === "year" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setTimePeriod("year")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  timePeriod === "year" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                Year
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                timePeriod === "all" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setTimePeriod("all")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  timePeriod === "all" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                All Time
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Stats */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-slate-800 mb-3">Summary</Text>
          <View className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row flex-wrap">
              <View className="w-1/2 mb-4 pr-2">
                <Text className="text-slate-500 text-xs">Games Played</Text>
                <Text className="text-2xl font-bold text-slate-800">
                  {stats.summary.gamesPlayed}
                </Text>
              </View>
              <View className="w-1/2 mb-4 pl-2">
                <Text className="text-slate-500 text-xs">Win Rate</Text>
                <Text className="text-2xl font-bold text-slate-800">
                  {stats.summary.winRate}%
                </Text>
              </View>
              <View className="w-1/2 mb-4 pr-2">
                <Text className="text-slate-500 text-xs">Total Points</Text>
                <Text className="text-2xl font-bold text-slate-800">
                  {stats.summary.totalPoints}
                </Text>
              </View>
              <View className="w-1/2 mb-4 pl-2">
                <Text className="text-slate-500 text-xs">Time Played</Text>
                <Text className="text-2xl font-bold text-slate-800">
                  {stats.summary.timeSpent}
                </Text>
              </View>
              <View className="w-1/2 pr-2">
                <Text className="text-slate-500 text-xs">Current Streak</Text>
                <Text className="text-2xl font-bold text-slate-800">
                  {stats.streaks.current} days
                </Text>
              </View>
              <View className="w-1/2 pl-2">
                <Text className="text-slate-500 text-xs">Longest Streak</Text>
                <Text className="text-2xl font-bold text-slate-800">
                  {stats.streaks.longest} days
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Activity Chart */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-slate-800 mb-3">
            Weekly Activity
          </Text>
          <View className="bg-white rounded-xl shadow-sm p-4">
            <BarChart data={weeklyActivity} labels={weekDays} />
          </View>
        </View>

        {/* Game Filter */}
        <View className="px-4 mb-4">
          <Text className="text-lg font-bold text-slate-800 mb-3">
            Game Statistics
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-3"
          >
            <View className="flex-row">
              <TouchableOpacity
                className={`mr-2 px-4 py-2 rounded-full ${
                  gameFilter === "all" ? "bg-indigo-600" : "bg-white"
                }`}
                onPress={() => setGameFilter("all")}
              >
                <Text
                  className={`text-sm font-medium ${
                    gameFilter === "all" ? "text-white" : "text-slate-500"
                  }`}
                >
                  All Games
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`mr-2 px-4 py-2 rounded-full ${
                  gameFilter === "sudoku" ? "bg-indigo-600" : "bg-white"
                }`}
                onPress={() => setGameFilter("sudoku")}
              >
                <Text
                  className={`text-sm font-medium ${
                    gameFilter === "sudoku" ? "text-white" : "text-slate-500"
                  }`}
                >
                  Sudoku
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`mr-2 px-4 py-2 rounded-full ${
                  gameFilter === "minesweeper" ? "bg-indigo-600" : "bg-white"
                }`}
                onPress={() => setGameFilter("minesweeper")}
              >
                <Text
                  className={`text-sm font-medium ${
                    gameFilter === "minesweeper"
                      ? "text-white"
                      : "text-slate-500"
                  }`}
                >
                  Minesweeper
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`mr-2 px-4 py-2 rounded-full ${
                  gameFilter === "tictactoe" ? "bg-indigo-600" : "bg-white"
                }`}
                onPress={() => setGameFilter("tictactoe")}
              >
                <Text
                  className={`text-sm font-medium ${
                    gameFilter === "tictactoe" ? "text-white" : "text-slate-500"
                  }`}
                >
                  Tic Tac Toe
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Game Stats Cards */}
          <View className="flex-row flex-wrap">
            {(gameFilter === "all" || gameFilter === "sudoku") && (
              <View className="w-full mb-3">
                <View className="bg-white rounded-xl shadow-sm p-4">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-blue-100 p-2 rounded-full mr-3">
                      <MaterialCommunityIcons
                        name="grid"
                        size={20}
                        color="#4f46e5"
                      />
                    </View>
                    <Text className="text-lg font-bold text-slate-800">
                      Sudoku
                    </Text>
                  </View>

                  <View className="flex-row flex-wrap">
                    <View className="w-1/2 mb-3 pr-2">
                      <Text className="text-slate-500 text-xs">
                        Games Played
                      </Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.sudoku.played}
                      </Text>
                    </View>
                    <View className="w-1/2 mb-3 pl-2">
                      <Text className="text-slate-500 text-xs">Win Rate</Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.sudoku.winRate}%
                      </Text>
                    </View>
                    <View className="w-1/2 pr-2">
                      <Text className="text-slate-500 text-xs">Best Score</Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.sudoku.bestScore}
                      </Text>
                    </View>
                    <View className="w-1/2 pl-2">
                      <Text className="text-slate-500 text-xs">
                        Time Played
                      </Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.sudoku.totalTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {(gameFilter === "all" || gameFilter === "minesweeper") && (
              <View className="w-full mb-3">
                <View className="bg-white rounded-xl shadow-sm p-4">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-red-100 p-2 rounded-full mr-3">
                      <FontAwesome5 name="bomb" size={18} color="#4f46e5" />
                    </View>
                    <Text className="text-lg font-bold text-slate-800">
                      Minesweeper
                    </Text>
                  </View>

                  <View className="flex-row flex-wrap">
                    <View className="w-1/2 mb-3 pr-2">
                      <Text className="text-slate-500 text-xs">
                        Games Played
                      </Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.minesweeper.played}
                      </Text>
                    </View>
                    <View className="w-1/2 mb-3 pl-2">
                      <Text className="text-slate-500 text-xs">Win Rate</Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.minesweeper.winRate}%
                      </Text>
                    </View>
                    <View className="w-1/2 pr-2">
                      <Text className="text-slate-500 text-xs">Best Score</Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.minesweeper.bestScore}
                      </Text>
                    </View>
                    <View className="w-1/2 pl-2">
                      <Text className="text-slate-500 text-xs">
                        Time Played
                      </Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.minesweeper.totalTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {(gameFilter === "all" || gameFilter === "tictactoe") && (
              <View className="w-full mb-3">
                <View className="bg-white rounded-xl shadow-sm p-4">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-green-100 p-2 rounded-full mr-3">
                      <MaterialCommunityIcons
                        name="close-box-outline"
                        size={20}
                        color="#4f46e5"
                      />
                    </View>
                    <Text className="text-lg font-bold text-slate-800">
                      Tic Tac Toe
                    </Text>
                  </View>

                  <View className="flex-row flex-wrap">
                    <View className="w-1/2 mb-3 pr-2">
                      <Text className="text-slate-500 text-xs">
                        Games Played
                      </Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.tictactoe.played}
                      </Text>
                    </View>
                    <View className="w-1/2 mb-3 pl-2">
                      <Text className="text-slate-500 text-xs">Win Rate</Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.tictactoe.winRate}%
                      </Text>
                    </View>
                    <View className="w-1/2 pr-2">
                      <Text className="text-slate-500 text-xs">Best Score</Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.tictactoe.bestScore}
                      </Text>
                    </View>
                    <View className="w-1/2 pl-2">
                      <Text className="text-slate-500 text-xs">
                        Time Played
                      </Text>
                      <Text className="text-xl font-bold text-slate-800">
                        {stats.games.tictactoe.totalTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Rankings */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-slate-800 mb-3">
            Rankings
          </Text>
          <View className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="bg-amber-100 p-2 rounded-full mr-3">
                  <Ionicons name="globe-outline" size={20} color="#4f46e5" />
                </View>
                <Text className="text-slate-800">Global Ranking</Text>
              </View>
              <Text className="font-bold text-slate-800">
                #{stats.rankings.global}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="bg-amber-100 p-2 rounded-full mr-3">
                  <Ionicons name="flag-outline" size={20} color="#4f46e5" />
                </View>
                <Text className="text-slate-800">Country Ranking</Text>
              </View>
              <Text className="font-bold text-slate-800">
                #{stats.rankings.country}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-amber-100 p-2 rounded-full mr-3">
                  <Ionicons name="people-outline" size={20} color="#4f46e5" />
                </View>
                <Text className="text-slate-800">Friends Ranking</Text>
              </View>
              <Text className="font-bold text-slate-800">
                #{stats.rankings.friends}
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Scores */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-slate-800 mb-3">
            Recent Scores
          </Text>
          <View className="bg-white rounded-xl shadow-sm overflow-hidden">
            {stats.recentScores.map((score, index) => (
              <View
                key={index}
                className={`p-4 flex-row items-center ${
                  index < stats.recentScores.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <View className="bg-indigo-100 p-2 rounded-full mr-3">
                  {gameIcons[score.game]}
                </View>

                <View className="flex-1">
                  <Text className="font-medium text-slate-800">
                    {score.game}
                  </Text>
                  <Text className="text-xs text-slate-500">{score.date}</Text>
                </View>

                <View className="items-end">
                  <Text className="font-medium text-slate-800">
                    {score.score}
                  </Text>
                  <Text className="text-xs text-indigo-600">points</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements Progress */}
        <View className="px-4 mb-8">
          <Text className="text-lg font-bold text-slate-800 mb-3">
            Achievements
          </Text>
          <View className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-slate-800">Progress</Text>
              <Text className="font-medium text-slate-800">
                {stats.achievements.unlocked}/{stats.achievements.total}
              </Text>
            </View>

            <View className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
              <View
                className="h-full bg-indigo-500 rounded-full"
                style={{
                  width: `${
                    (stats.achievements.unlocked / stats.achievements.total) *
                    100
                  }%`,
                }}
              />
            </View>

            <Text className="text-slate-500 text-sm mb-3">
              Recently Unlocked
            </Text>

            {stats.achievements.recent.map((achievement, index) => (
              <View
                key={index}
                className={`flex-row items-center py-2 ${
                  index < stats.achievements.recent.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <View className="bg-indigo-100 p-1 rounded-full mr-3">
                  <Ionicons name="trophy" size={16} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-slate-800">
                    {achievement.name}
                  </Text>
                </View>
                <Text className="text-xs text-slate-500">
                  {achievement.date}
                </Text>
              </View>
            ))}
          </View>
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
          <Ionicons name="stats-chart" size={24} color="#4f46e5" />
          <Text className="text-xs text-indigo-600 font-medium">Stats</Text>
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
